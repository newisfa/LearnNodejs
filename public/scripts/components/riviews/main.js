var Vue = require("vueResource");

require("directives/time-format.js");

Vue.http.headers.common['token'] = User.token;
module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
        return {
            riviews: [],
            Editting:false
        }
    },
    ready: function() {
        // GET /riview/list
        this.$http.get('riview').then(function(res) {
            this.riviews = res.data;
        }, function(err) {
            // error callback
        });

    },
    methods: {
        save: function(i) {
            var riview = this.riviews[i];
            this.$http.put('riview/' + riview.id, riview).then(function(req, res){
                console.log("ID:", riview.id);
                console.log("DATA:", riview);
                this.riview = req.data
            }, function (err) {
            });
        },
        Delete: function(i) {
            var riview = this.riviews[i];
            this.$http.delete('riview/' + riview.id, riview).then(function(req, res){
                this.riview = req.data
            }, function (err) {
            });
        },
        isEditting: function(add) {
            this.Editting = true;
        }


    }

});

