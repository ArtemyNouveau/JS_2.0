<template>
    <div>
        <div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Покупки</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="container-fluid">
                        <Item v-for="product in goods"
                              :product="product"></Item>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary">Оплатить {{ total() }}$</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './CartItem.vue';

    export default {
        data() {
            return {
                goods: [],
            }
        },
        components: {
            Item
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
                            resolve(JSON.parse(xhr.responseText).contents);
                        } else {
                            reject(xhr.status)
                        }
                    };

                    xhr.open("GET", url);
                    xhr.send();
                })
            },
            total() {
                return this.goods.reduce((acc, item) => {
                    return acc += Number(item.quantity*item.price);
                }, 0);
            }
        },
        mounted() {
            let API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
            this.makeGETRequest(`${API_URL}/getBasket.json`).then((goods) => {
                this.goods = goods
            });
        }
    }
</script>