var express = require("express");
var http = require("http");
var fs = require("fs");
var Path = require("path");
var nunjucks = require("nunjucks");
var bodyParser = require('body-parser');
var request = require('request');
var flash = require('express-flash');
var sessions = require('express-session');


var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch:true
});

app.use(sessions({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
//app.use(express.session({ }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(Path.join(__dirname, "public")));

app.get("/register", function(req, res){
     res.render("register.html")
});

app.get("/login", function(req,res){
    res.render("login.html")
});
app.get("/home", function(req, res){
    res.render("home.html")
});
var baseUrl = "http://localhost:9000/api";

app.post("/register", function(req, res){
   request.post(baseUrl+"/authors", {
       json:true,
       body : {
           name: req.body.name,
           email: req.body.email,
           password :req.body.password
       }
   }, function(err, response, body){
       if(body.status == "Success"){
           res.redirect("/login")
       }else{
           req.flash("error", body.body);
           res.redirect("back")
       }
   })
});

app.get("/authors/create", function(req, res){
    res.render("authors/create.html")
});
app.get("/users/create", function(req, res){
    res.render("users/create.html")
});

app.post("/users/create", function(req, res){
    request.post(baseUrl + "/users", {
        headers:{
            token:req.session.user.token
        },
        json:true,
        body : {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            req.session.user = body.body;
            res.redirect("/users");
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});
app.post("/authors/create", function(req, res){
    request.post(baseUrl + "/author", {
        headers:{
            token:req.session.user.token
        },
        json:true,
        body : {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: parseInt(req.body.phone)
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            req.session.user = body.body;
            res.redirect("/authors");
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});

app.get("/publishers/create", function(req,res){
    res.render("publishers/create.html")
});

app.post("/publishers/create", function(req, res){
    request.post(baseUrl + "/publisher", {
        headers:{
            token:req.session.user.token
        },
        json:true,
        body : {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: parseInt(req.body.phone)
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            req.session.user = body.body;
            res.redirect("/publishers");
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});

app.get("/riviews/remove/:id", function(req, res){
    res.render("riviews/list.html")
});
app.get("/users/remove/:id", function(req, res){
    res.render("users/list.html")
});
app.get("/riviews/create", function(req, res){
    res.render("riviews/create.html")
});
app.post("/riviews/create", function(req, res){
    request.post(baseUrl + "/riview", {
        json:true,
        body : {
            name: req.body.name,
            email: req.body.email,
            description: req.body.description,
            address: req.body.address,
            phone: parseInt(req.body.phone)
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            res.redirect("/riviews")
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});
app.get("/books/create", function(req, res){
    res.render("books/create.html")
});

app.post("/books/create", function(req, res){
    request.post(baseUrl + "/books", {
        json:true,
        body : {
            name: req.body.name,
            authorsId:parseInt(req.body.authorsId),
            publishersId:parseInt(req.body.publishersId),
            riviewsId:(req.body.riviewsId)
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            res.redirect("/books")
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});
app.post("/books/create", function(req, res){
    request.post(baseUrl + "/books", {
        json:true,
        body : {
            name: req.body.name
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            res.redirect("/books")
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});

app.post("/login", function(req, res){
    request.post(baseUrl + "/login", {
        json:true,
        body : {
            email: req.body.email,
            password :req.body.password
        }
    }, function(err, response, body){
        if(body.status == "Success"){
            req.session.user = body.body;
            res.redirect("/home");
        }else{
            req.flash("error", body.body);
            res.redirect("/")
        }
    })
});

app.use("/", function(req, res, next){
    if(req.session.user){
        app.locals.user = req.session.user;
        next();
    }
    else res.redirect("/login")
});
app.get("/authors", function(req, res){
    res.render("authors/list.html")
});
app.get("/users", function(req, res){
    res.render("users/list.html")
});

app.get("/publishers", function(req,res){
    res.render("publishers/list.html")
});
app.get("/riviews", function(req,res){
    res.render("riviews/list.html")
});
app.get("/books", function(req,res){
    res.render("books/list.html")
});

app.get("/books/:id", function(req, res){
    res.render("books/list.html")
});

app.get('/logout', function (req, res) {
    res.redirect("/login");
});

app.get("/config.js", function(req,res){
    var src = "var User = " + JSON.stringify(req.session.user);
    res.send(src);
});



http.createServer(app).listen(80);
//app.listen(900);
console.log("Application listening on port 900...");