var Vue = require("vueResource");

require("directives/time-format.js");

Vue.http.headers.common['token'] = User.token;
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
        return {
            books: [],
            Editting:false
        }
    },
    ready: function() {
        // GET /books/list
        this.$http.get('books').then(function(res) {
            this.books = res.data;
        }, function(err) {
            // error callback
        });

    },
    methods: {
        save: function(i) {
            var book = this.books[i];
            this.$http.put('books/' + book.id, book).then(function(req, res){
                console.log("ID:", book.id);
                console.log("DATA:", book);
                this.book = req.data
            }, function (err) {
            });
        },
        Delete: function(i) {
            var book = this.books[i];
            this.$http.delete('books/' + book.id, book).then(function(req, res){
                console.log("ID:", book.id);
                console.log("DATA:", book);
                this.book = req.data
            }, function (err) {
            });
        },
        isEditting: function(add) {
            this.Editting = true;
        }


    }

});
