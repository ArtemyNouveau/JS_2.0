<template>
    <div class="mainContent">
        <hr>
        <search-bar @input="changeSearch"></search-bar>
        <div class="row">
        <ProductItem v-for="product in filteredGoods"
                     :product="product"></ProductItem>
        </div>
    </div>
</template>
<script>
    import ProductItem from './ProductItem.vue';
    import SearchBar from './SearchBar.vue';
    import _ from 'lodash';

    export default {
        data() {
            return {
                goods: [],
                searchLine: '',
                currentSearch: new RegExp('')
            }
        },
        components: {
            SearchBar,
            ProductItem
        },
        methods: {
            makeGETRequest(url) {
                return new Promise((resolve, reject) => {
                    let xhr;

                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    } else if (window.ActiveXObject) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState !== 4) return;
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(xhr.status)
                        }
                    };

                    xhr.open("GET", url);
                    xhr.send();
                })
            },
            filterGoods() {
                this.currentSearch = new RegExp(this.searchLine, 'i');
            },
            changeSearch(searchLine) {
                this.searchLine = searchLine;
                this.throttleFilter();
            }
        },
        computed: {
            throttleFilter() {
                return _.throttle(this.filterGoods, 700);
            },
            filteredGoods() {
                if (!this.goods || !Array.isArray(this.goods)) return [];
                return this.goods.filter(good =>
                    this.currentSearch.test(good.product_name));
            }
        },
        mounted() {
            let API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
            this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {this.goods = goods});
        }
    }
</script>
