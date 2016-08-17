var Vue = require("vueResource");

require("directives/time-format.js");

Vue.http.headers.common['token'] = User.token;
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
        return {
            users: [],
            Editting:false
        }
    },
    ready: function() {
        // GET /users/
            this.$http.get('users').then(function (res) {
                this.users = res.data;
            }, function (err) {

            });
    },
    methods: {
        save: function(i) {
            var user = this.users[i];
        this.$http.put('users/' + user.id, user).then(function(req, res){
            this.user = req.data
            this.Editting = false;
        }, function (err) {
        });
    },
        Delete: function(i) {
            var user = this.users[i];
        this.$http.delete('users/' + user.id, user).then(function(req, res){
            this.user = req.data
        }, function (err) {
        });
    },
        isEditting: function(add) {
            this.Editting = true;
        }


    }

});
