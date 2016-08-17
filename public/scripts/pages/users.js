System.import("vue").then(function(Vue){
    System.import("components/users").then(function(UsersComponents){
        new Vue({
            el: '#app',
            components:{
                "users":UsersComponents
            }
        })
    });
});


