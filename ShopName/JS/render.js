const renderGoodsCard = (title, price, amount = 0) => {
    const determine = () => {
        if (amount === 0)
            return `
            <div class="col-12">
            <a href="Basket.html" class="btn btn-light" style="width: 100%">Buy for ${price}</a>
            </div>`;
        else return `<div class="col-7">Amount: ${amount}</div>
                            <div class="col-5">For: ${price*amount}</div>`
    };

    return `
    <div class="card">
        <div class="card-header">
            ${title}
        </div>
        <div class="row card-body">
            ${determine()}
        </div>
    </div>`
};
