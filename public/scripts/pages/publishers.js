System.import("vue").then(function(Vue){
    System.import("components/publishers").then(function(PublisherComponents){
        new Vue({
            el: '#app',
            components:{
                "publishers":PublisherComponents
            }
        })
    });
});


