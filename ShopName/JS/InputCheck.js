let isMassageCreated = false;

let addStyle = () => {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'InputCheck.css'
    head.appendChild(link);
};

let formMassage = (name, text, contact) => {
    let massage = document.getElementById('massage');
    massage.classList.add('card');
    let header = document.createElement('div');
    header.id = 'cardHeader';
    header.classList.add('card-header');
    header.innerText = `${name} we will contact you later`;
    let body =  document.createElement('div');
    body.id = 'cardBody';
    body.classList.add('card-body');
    body.innerText = `Your text is:\n${text}`;
    let footer = document.createElement('div');
    footer.id = 'cardFooter';
    footer.classList.add('card-footer');
    footer.innerText = contact;

    massage.appendChild(header);
    massage.appendChild(body);
    if (contact !== ' ') massage.appendChild(footer);
};

let changeMassage = (name, text, contact) => {
    let header = document.getElementById('cardHeader');
    let body = document.getElementById('cardBody');
    let footer = document.getElementById('cardFooter');

    header.innerText = `Hello, ${name}!`;
    body.innerText = `Your text is:\n${text}`;
    if (contact !== ' ') footer.innerText = contact;
};

let textValidator = (text) => {
    return `« ${text.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2')} »`;
};

let Check = (regexp, text) => {

};

submit.onclick = function () {
    addStyle();
    let name = document.getElementById('name').value;
    let contact = document.getElementById('inputEmail').value + ' ' + document.getElementById('phone').value;
    let text = document.getElementById('help').value;
    if (name === '' || text === '') return;
    text = textValidator(text);
    if (isMassageCreated) changeMassage(name, text, contact);
    else {
        let submitBtn = document.getElementById('submit');
        submitBtn.innerText = 'Edit massage';
        isMassageCreated = true;
        formMassage(name, text, contact);
    }
};

