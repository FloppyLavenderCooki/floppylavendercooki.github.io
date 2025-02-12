let pageData = {};
// let description = document.getElementById("description");

fetch(`../logs/pages.json`).then((response) => {
    response.json().then((data) => {
        pageData = data;
        for (let e in pageData["pages"]) {
            // console.log(e)
            let a = document.createElement("a");
            a.href = `view/index.html?page=${e}`;
            
            let div = document.createElement("div");
            div.className = "blog-page";
            
            let title = document.createElement("span")
            title.className = "title-a"
            title.innerText = `${e}`;
            
            let descSpan = document.createElement("span");
            descSpan.className = "desc-span"
            descSpan.innerText = pageData["pages"][e];
            
            div.append(title, document.createElement("br"), descSpan);
            a.appendChild(div);
            pages.appendChild(a);
        }
    })
});

let pages = document.getElementById("pages");