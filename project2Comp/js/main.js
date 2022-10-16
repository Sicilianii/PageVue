let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const list = new Vue({
    el: '#app',
    methods: {
        getJSON(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
    },
    mounted() {
        
    }
})