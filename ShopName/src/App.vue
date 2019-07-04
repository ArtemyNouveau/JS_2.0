<template>
    <div>
        <div class="container">
            <h2 class="display-4">Catalog</h2>
            <products></products>
            <cart></cart>
        </div>
    </div>
</template>

<script>
    import ProductsList from './ProductsList.vue'
    import Cart from './Cart.vue'

    export default {
        data() {
            return {
                selectedProduct: {},
                searchLine: ''
            }
        },
        components: {
            'products': ProductsList,
            Cart
        },
        methods: {
            viewDetails(product) {
                this.selectedProduct = product;
            },
            changeSearch(searchLine) {
                console.log(searchLine);
                this.searchLine = searchLine;
            }
        }
    }
</script>

<style >
    html {
        position: relative;
        min-height: 100%;
    }
    body {
        margin-bottom: 60px;
    }
    footer {
        position: absolute;
        bottom: 0;
        padding: 15px;
        width: 100%;
        height: 60px;
        background-color: #f5f5f5;
    }
</style>