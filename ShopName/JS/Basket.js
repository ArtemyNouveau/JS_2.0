class GoodsItem {
    constructor(title, amount, price, id) {
        this.title = title;
        this.amount = amount;
        this.price = price;
        this.id = id;
    }

    render() {
        return renderGoodsCard(this.title, this.price, this.amount);
    }
}

class Basket {
    constructor(id = "basket") {
        this.el = document.getElementById(id);
        this.goods = [];
    }

    fetchGoods() {
        return makeGETRequest(`${URL}/getBasket.json`).then((goods) => {
            const cart = JSON.parse(goods);
            this.goods = cart.contents;
            console.log(cart);
        }).catch(e => e)
    }

    add() {
        return makeGETRequest(`${URL}/addToBasket.json`)
    }

    delete() {
        return makeGETRequest(`${URL}/deleteFromBasket.json`)
    }

    total() {
        return this.total = this.goods.reduce((acc, good) => {
            return acc += Number(good.quantity*good.price);
        }, 0);
    }

    render() {
        let basketHtml = this.goods.reduce((acc, good) => {
            const goodItem = new GoodsItem(good.product_name, good.quantity, good.price, good.id_product);
            return acc += goodItem.render();
        }, '');
        basketHtml += `
        <hr>
        <a href="#" class="btn btn-primary" style="width: 100%">Buy for ${this.total()}</a>`
        this.el.innerHTML = basketHtml;
    }
}

const basket = new Basket();
basket.fetchGoods().then( () => {
    basket.render()
});