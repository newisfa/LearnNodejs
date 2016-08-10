System.import("vue").then(function(Vue){
    System.import("components/author").then(function(AuthorComponents){
        new Vue({
            el: '#app',
            components:{
                "author":AuthorComponents
            }
        })
    });
});


