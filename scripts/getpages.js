let pagedata = {};
let description = document.getElementById("description");

fetch(`../logs/pages.json`).then((response) => {
    response.json().then((data) => {
        pagedata = data;
        for (e in pagedata["pages"]) {
            console.log(e)
            let li = document.createElement("li");
            let element = document.createElement("a")
            element.innerText = `${e} - ${pagedata["pages"][e]}`;
            element.href = `view/index.html?page=${e}`
            li.appendChild(element);
            pages.appendChild(li)
        }
    })
});

let pages = document.getElementById("pages");