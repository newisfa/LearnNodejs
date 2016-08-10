System.import("vue").then(function(Vue){
    System.import("components/authors").then(function(AuthorComponents){
        new Vue({
            el: '#app',
            components:{
                "authors":AuthorComponents
            }
        })
    });
});


