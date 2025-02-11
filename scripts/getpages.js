let pagedata = {};
let description = document.getElementById("description");

fetch(`../logs/pages.json`).then((response) => {
    response.json().then((data) => {
        pagedata = data;
        for (e in pagedata["pages"]) {
            console.log(e)
            let li = document.createElement("div");
            li.className = "blogpage";
            let element = document.createElement("a")
            element.className = "titlea"
            element.innerText = `${e}`;
            let element2 = document.createElement("span");
            element2.className = "descspan"
            element2.innerText = pagedata["pages"][e];
            element.href = `view/index.html?page=${e}`
            li.appendChild(element);
            li.appendChild(document.createElement("br"));
            li.appendChild(element2);
            pages.appendChild(li)
        }
    })
});

let pages = document.getElementById("pages");