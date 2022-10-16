Vue.component('products', {
    data() {
        return {
            imgCatalog: 'img/shrek.jpg',
            catalogUrl: 'catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted() {
        this.$parent.getJSON(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data) {
                    // console.log(data)
                    this.products.push(el);
                    this.filtered.push(el);
                }
        })
    },
    template: `
    <div class="products container">
        <product v-for="product of filtered" :key="product.id_product" :product="product" :img="imgCatalog"></product>
    </div>
    `
})

Vue.component('product', {
    props: ['img', 'product'],
    template: `
        <div class="products-item">
            <img :src="img" alt="foto">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Buy</button>
            </div>
        </div>
    `
})