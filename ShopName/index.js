class GoodsItem {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }

    render(id) {
        return `<div class="card mx-auto col-md-6 col-lg-4" style="border: none; margin: 7px"">` +
            `<img class="card-img" src="https://graphicsland.ru/wp-content/uploads/low-poly-texture.jpg" alt="...">` +
            `<div class="card-img-overlay text-white">` +
                `<h4 class="card-title">${this.title}</h4>` +
                `<p class="card-text">${this.description}</p>` +
                `<div class="btn-group" role="group" aria-label="Basic example">` +
                    `<button type="button" class="btn btn-light" onclick="addToBasket(this)" data-id="${id}">` +
                    `Buy for ${this.price}$` +
                    `</button>` +
                `</div>` +
            `</div>` +
            `</div>`;
    }
}

function addToBasket(thisBtn) {
    let item = list.getItem(thisBtn.dataset.id);
    if (item.flag) {
        if (item.amount < 1){
            basket.addGood(item);
        }
        item.amount++;
        return;
    }
    item.flag = true;
    basket.addGood(item);

    let newButton = document.createElement("button");
    newButton.classList.add("btn");
    newButton.classList.add("btn-light");
    newButton.dataset.toggle = "modal";
    newButton.dataset.target = "#exampleModalCenter";
    newButton.innerHTML = "<i class=\"fas fa-shopping-cart\"></i>";
    newButton.onclick = () => basket.render();

    thisBtn.parentNode.appendChild(newButton);
}

class GoodsList {
    constructor(id = "list") {
        this.el = document.getElementById(id);
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {
                title: "product1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 150,
                amount: 1,
                flag: false,
            },
            {
                title: "product2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 100,
                amount: 1,
                flag: false,
            },
            {
                title: "product3",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 300,
                amount: 1,
                flag: false,
            },
            {
                title: "product4",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 250,
                amount: 1,
                flag: false,
            },
            {
                title: "product5",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 200,
                amount: 1,
                flag: false,
            },
            {
                title: "product6",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 150,
                amount: 1,
                flag: false,
            }
        ];
    }

    getItem(index) {
        return this.goods[index];
    }

    render() {
        const listHtml = this.goods.reduce((acc, good, index) => {
            const goodItem = new GoodsItem(good.title, good.description, good.price, good.amount, good.flag);
            return acc += goodItem.render(index);
        }, '');
        this.el.innerHTML = listHtml;
    }
}

class BasketItem {
    constructor(goodItem) {
        this.goodItem = goodItem;
    }

    render(id) {
        return `<li class="list-group-item">
            <div class="row">
                <div class="col-5 col-md-6">${this.goodItem.title}</div>
                <div class="col-4"">
                    <input autofocus onchange="basket.changeAmount(this)" type="number" min="0" max="100" step="1" value="${this.goodItem.amount}" class="stepper__input" data-id="${id}">
                    </div>
                <div class="col-3 col-md-2">${this.goodItem.price}$</div>
            </div>
            </li>`
    }
}

class Basket extends GoodsList{
    constructor(id = "basket") {
        super(id);
        this.total = 0;
    }

    addGood(goodItem) {
        this.goods.push(goodItem);
    }

    changeAmount(thisBtn) {
        let item = this.goods[thisBtn.dataset.id];
        let prevCost = item.amount*item.price;
        item.amount = Number(thisBtn.value);
        this.total += item.amount*item.price - prevCost;

        if (thisBtn.value < 1) {
            delete this.goods[thisBtn.dataset.id];
        }
        this.render();
    }

    render() {
        let listHtml = this.goods.reduce((acc, good, index) => {
            const goodItem = new BasketItem(good);
            console.log(good);
            return acc += goodItem.render(index);
        }, '');

        this.total = this.goods.reduce((acc, good) => {
            return acc += Number(good.amount*good.price);
        }, 0);
        listHtml += `<hr> <li class="list-group-item">
            <div class="row">
            <div class="col-9 col-md-10">total:</div>
        <div class="col-3 col-md-2">${this.total}$</div>
        </div>
        </li>`;
        this.el.innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

const basket = new Basket();