System.import("vue").then(function(Vue){
    System.import("components/books").then(function(BooksComponents){
        new Vue({
            el: '#app',
            components:{
                "books":BooksComponents
            }
        })
    });
});


