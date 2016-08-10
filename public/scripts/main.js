(function(){
    SystemJS.config({
        baseURL: '/public/scripts',
        map: {
            vue: "vue.js",
            moment: "moment.js",
            vueResource: "vueResourceConfig.js",
            text: "text.js"
        },
        packages: {
            "components/authors":{
                main: "main.js"
            },
            "components/author":{
                main: "main.js"
            },
            "components/publishers":{
                main: "main.js"
            },
            "components/riviews":{
                main: "main.js"
            },
            "components/books":{
                main: "main.js"
            }
        }
    });
})();