<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">{{product.product_name}}</h4>
            <p class="card-text">Всего за ${{product.price}}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Посмотреть покупки
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            },
        },
        methods: {

        }
    }
</script>

<style scoped>
    .card{
        margin: 15px;
        text-align: center;
    }

    .card-body {
        min-width: 300px;
    }
</style>