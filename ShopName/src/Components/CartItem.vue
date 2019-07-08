<template>
    <div class="row">
        <div class="col-md-4">{{product.product_name}}</div>
        <div class="col-md-4">{{product.quantity}} шт</div>
        <div class="col-md-4">{{product.price}}$</div>
    </div>
</template>


<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style scoped>
    .row{
        border-bottom: 1px solid #dee2e6;
    }

    .row:last-child{
        border-bottom: none;
    }
</style>