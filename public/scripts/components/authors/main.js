var Vue = require("vueResource");

require("directives/time-format.js");

Vue.http.headers.common['token'] = User.token;
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
        return {
            authors: [],
            Editting:false
        }
    },
    ready: function() {
        // GET /authors/
            this.$http.get('author').then(function (res) {
                this.authors = res.data;
            }, function (err) {

            });
    },
    methods: {
        save: function(i) {
            var author = this.authors[i];
        this.$http.put('author/' + author.id, author).then(function(req, res){
            this.author = req.data
            this.Editting = false;
        }, function (err) {
        });
    },
        Delete: function(i) {
            var author = this.authors[i];
        this.$http.delete('author/' + author.id, author).then(function(req, res){
            this.author = req.data
        }, function (err) {
        });
    },
        isEditting: function(add) {
            this.Editting = true;
        }


    }

});
