class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }

    render() {
        return renderGoodsCard(this.title, this.price)
    }
}

class GoodsList {
    constructor(id = "list") {
        this.el = document.getElementById(id);
        this.goods = [];
    }

    fetchGoods() {
        return makeGETRequest(`${URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
        }).catch(e => e)
    }

    render() {
        const listHtml = this.goods.reduce((acc, good) => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            return acc += goodItem.render();
        }, '');
        this.el.innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods().then( () => {
    list.render()
});