var Vue = require("vueResource");

require("directives/time-format.js");

Vue.http.headers.common['token'] = User.token;
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
        return {
            publishers: [],
            Editting:false
        }
    },
    ready: function() {
        // GET /publishers
        this.$http.get('publisher').then(function(res) {
            this.publishers = res.data;
        }, function(err) {
            // error callback
        });

    },
    methods: {
        save: function(i) {
            var publisher = this.publishers[i];
            this.$http.put('publisher/' + publisher.id, publisher).then(function(req, res){
                console.log("ID:", publisher.id);
                console.log("DATA:", publisher);
                this.publisher = req.data
            }, function (err) {
            });
        },
        Delete: function(i) {
            var publisher = this.publishers[i];
            this.$http.delete('publisher/' + publisher.id, publisher).then(function(req, res){
                console.log("ID:", publisher.id);
                console.log("DATA:", publisher);
                this.publisher = req.data
            }, function (err) {
            });
        },
        isEditting: function(add) {
            this.Editting = true;
        }


    }

});