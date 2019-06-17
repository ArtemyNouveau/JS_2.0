const goodsList = document.getElementById("list");
const basket = document.getElementById("basket");
const goods = [
    {
        title: "product1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        price: 150
    },
    {
        title: "product2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        price: 100
    },
    {
        title: "product3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        price: 300
    },
    {
        title: "product4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        price: 250},
    {
        title: "product5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        price: 200
    },
    {
        title: "product6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        price: 150
    }
];

const renderGood = (title = "product", description = "lorem", price = 0) => {
    return `<div class="card mx-auto col-md-6 col-lg-4" style="border: none; margin: 7px">` +
        `<img class="card-img" src="https://graphicsland.ru/wp-content/uploads/low-poly-texture.jpg" alt="...">` +
        `<div class="card-img-overlay text-white">` +
            `<h4 class="card-title">${title}</h4>` +
            `<p class="card-text">${description}</p>` +
            `<button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModalCenter">` +
            `Buy for ${price}$` +
            `</button>` +
        `</div>` +
    `</div>`
};

const renderGoods = (list) => {
    goodsList.innerHTML = list.map(list => renderGood(list.title, list.description, list.price)).join('');
};

renderGoods(goods);