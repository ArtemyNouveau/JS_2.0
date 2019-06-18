class GoodsItem {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }

    render(id) {
        return `<div class="card mx-auto col-md-6 col-lg-4" style="border: none; margin: 7px"">` +
            `<img class="card-img" src="https://graphicsland.ru/wp-content/uploads/low-poly-texture.jpg" alt="...">` +
            `<div class="card-img-overlay text-white" data-id="${id}">` +
                `<h4 class="card-title">${this.title}</h4>` +
                `<p class="card-text">${this.description}</p>` +
                `<button type="button" class="btn btn-light" onclick="addToBasket(this)">` +
                `Buy for ${this.price}` +
                `</button>` +
            `</div>` +
            `</div>`;
    }
}

function addToBasket(thisBtn) {
    let newButton = document.createElement("button");
    newButton.classList.add("btn");
    newButton.classList.add("btn-light");
    newButton.dataset.toggle = "modal";
    newButton.dataset.target = "#exampleModalCenter";
    newButton.innerText = "View Basket";
    newButton.onclick = () => basket.render();

    let item = list.getItem(thisBtn.parentNode.dataset.id);
    basket.addGood(item.title, item.price);

    thisBtn.parentNode.appendChild(newButton);
    thisBtn.parentNode.removeChild(thisBtn);

    console.log(basket.total);
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
                amount: 1
            },
            {
                title: "product2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 100,
                amount: 1
            },
            {
                title: "product3",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 300,
                amount: 1
            },
            {
                title: "product4",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 250,
                amount: 1
            },
            {
                title: "product5",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 200,
                amount: 1
            },
            {
                title: "product6",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
                price: 150,
                amount: 1
            }
        ];
    }

    getItem(index) {
        return this.goods[index];
    }

    render() {
        const listHtml = this.goods.reduce((acc, good, index) => {
            const goodItem = new GoodsItem(good.title, good.description, good.price);
            return acc += goodItem.render(index);
        }, '');
        this.el.innerHTML = listHtml;
    }
}

class BasketItem {
    constructor(title, price, amount) {
        this.title = title;
        this._amount = amount;
        this._price = price;
    }


    get price() {
        return this._price;
    }

    render(id) {
        return `<li class="list-group-item">
            <div class="row">
                <div class="col-5 col-md-6">${this.title}</div>
                <div class="col-4"">
                    <input autofocus onchange="basket.changeAmount(this)" type="number" min="1" max="100" step="1" value="${this._amount}" class="stepper__input" data-id="${id}">
                    </div>
                <div class="col-3 col-md-2">${this._price}$</div>
            </div>
            </li>`
    }
}

class Basket extends GoodsList{
    constructor(id = "basket") {
        super(id);
        this.total = 0;
    }

    addGood(title, price) {
        this.goods.push({title, price, amount: 1});
        this.total += price;
    }

    changeAmount(thisBtn) {
        let item = this.goods[thisBtn.dataset.id];
        let prevCost = item.amount * item.price;
        item.amount = Number(thisBtn.value);
        this.total += item.amount*item.price - prevCost;
        this.render();

        // if (thisBtn.value < 1) {
        //     delete this.goods[thisBtn.dataset.id];
        //     this.render();
        // }
    }

    render() {
        let listHtml = this.goods.reduce((acc, good, index) => {
            const goodItem = new BasketItem(good.title, good.price, good.amount);
            return acc += goodItem.render(index);
        }, '');
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