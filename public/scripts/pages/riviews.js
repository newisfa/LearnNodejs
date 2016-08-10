System.import("vue").then(function(Vue){
    System.import("components/riviews").then(function(RiviewComponents){
        new Vue({
            el: '#app',
            components:{
                "riviews":RiviewComponents
            }
        })
    });
});


