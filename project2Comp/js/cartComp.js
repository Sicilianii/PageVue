Vue.component('cart', {
    data() {
        return {
            imgCart: 'img/shrek-mini.jpg',
            cartUrl: 'getBasket.json',
            cartItems: [],
            showCart: false
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJSON(`${API + 'addToBasket.json'}`)
                .then(data => {
                    // console.log(data)
                    if(data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        console.log(find)
                        if(find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        alert('Error');
                    }
            })
        },
        remove(item) {
            this.$parent.getJSON(`${API + 'deleteFromBasket.json'}`)
                .then(data => {
                    // console.log(data)
                    if(data.result === 1) {
                        if(item.quantity>1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    } else {
                        alert('Error');
                    }
            })
        }
    },
    template: `
    <div>
        <button class="btn-cart" type="button" @click="showCart = !showCart">Cart</button>
        <div class="cart-block" v-show="!showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item v-for="item of cartItems" :key="item.id_product" @remove="remove" :item="item" :img="imgCart">
            </cart-item>
        </div>
    </div>
    `,
    mounted() {
        this.$parent.getJSON(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents) {
                    this.cartItems.push(el);
                }
        })
    }
})

Vue.component('cart-item',{
    props: ['item', 'img'],
    template: `
        <div class="cart-item">
            <img :src="img" alt="foto">
            <div class="desc">
            <h3>{{ item.product_name }}</h3>
                <p>Price: {{ item.price }}$</p>
                <p>Quantity: {{ item.quantity }}</p>
                <button class="btn-cart-item" type="button" @click="$emit('remove', item)">Delete</button>
            </div>
        </div>
    `
})


