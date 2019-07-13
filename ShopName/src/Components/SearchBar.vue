<template>
    <form>
        <div class="form-group">
            <label>Ищите что-то конкретное?
                <input v-model.trim="searchLine"
                       @input="changeSearch"
                       class="form-control"
                       type="text">
            </label>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                searchLine: ''
            }
        },
        methods: {
            changeSearch() {
                this.$emit("input", this.searchLine);
            }
        }
    }
</script>

<style scoped>
    .form-group{
        margin-top: 25px;
        margin-bottom: 0;
    }

    label{
        width: 100%;
    }

    input{
        width: 100%;
    }
</style>