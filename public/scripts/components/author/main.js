var Vue = require("vueResource");

require("directives/time-format.js");

Vue.http.headers.common['token'] = User.token;
module.exports = Vue.extend({
    template: require("./main.html!text"),
    data: function(){
       return {
           author: {id:0, user:{}}
       }
    },
    ready: function() {

        var path = location.pathname.split("/");

    // GET /posts/id
    this.$http.get('author/' + path[path.length-1]).then(function(res) {
        this.$set("author" , res.data)
    }, function(err) {
        // error callback
    });
},
    methods:{
        create: function () {
            this.$http.post('author/' + this.id).then(function (res) {
                this.author = req.data
            }, function (err) {
            });
        }
    }
});
