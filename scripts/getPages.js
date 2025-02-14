// let pageData = {};
// let description = document.getElementById("description");
let pages = document.getElementById("pages");
const sort = document.getElementById("sort");
sort.onchange = () => {
    localStorage.setItem("sort", sort.value);
    pages.innerHTML = "";
    fetchPageData();
}
if (localStorage.getItem("sort")) {
    sort.value = localStorage.getItem("sort");
}

let lastModifiedArr = {};
if (sessionStorage.getItem("lastModifiedArr")) {
    lastModifiedArr = JSON.parse(sessionStorage.getItem("lastModifiedArr"));
}

function makePage(e, pageData) {
    let a = document.createElement("a");
    a.href = `view/index.html?page=${e}`;
    a.id = `page-${e}`;

    let div = document.createElement("div");
    div.className = "blog-page";

    let title = document.createElement("span");
    title.className = "title-a";
    title.innerText = `${e}`;

    let descSpan = document.createElement("span");
    descSpan.className = "desc-span";
    descSpan.innerText = pageData["pages"][e];

    div.append(title, document.createElement("br"), descSpan);
    a.appendChild(div);
    pages.appendChild(a);
}

async function fetchPageData() {
    try {
        const response = await fetch(`../logs/pages.json`);
        const pageData = await response.json();

        switch (sort.value) {
            case "latest":
                if (Object.entries(lastModifiedArr).length === 0) {
                    for (let e in pageData["pages"]) {
                        try {
                            const mdResponse = await fetch(`https://api.github.com/repositories/930020370/commits?path=logs/${e}.md&per_page=1`);
                            const lastModified = mdResponse.headers.get('Last-Modified');

                            if (lastModified) {
                                // console.log('Last Modified:', lastModified);
                                lastModifiedArr[e] = lastModified;
                            } else {
                                console.log('No Last-Modified header found');
                            }
                        } catch (err) {
                            console.log(`Error fetching last modified for ${e}:`, err);
                        }
                    }
                }

                lastModifiedArr = Object.fromEntries(Object.entries(lastModifiedArr)
                    .sort((a, b) => new Date(b[1]) - new Date(a[1])));
                // console.log(lastModifiedArr);

                sessionStorage.setItem("lastModifiedArr", JSON.stringify(lastModifiedArr));

                for (let e in lastModifiedArr) {
                    makePage(e, pageData);
                }
                break;
            default:
                for (let e in pageData["pages"]) {
                    makePage(e, pageData);
                }
                break;
        }
    } catch (error) {
        console.log("Error fetching pages data:", error);
    }
}
fetchPageData();