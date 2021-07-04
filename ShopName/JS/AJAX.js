const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";


function makeGETRequest(url) {
    return new Promise(((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status <= 300) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.status);
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    }))
}