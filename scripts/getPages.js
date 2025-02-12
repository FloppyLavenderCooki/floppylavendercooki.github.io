// let pageData = {};
// let description = document.getElementById("description");
let pages = document.getElementById("pages");

async function fetchPageData() {
    try {
        const response = await fetch(`../logs/pages.json`);
        const pageData = await response.json();
        let lastModifiedArr = {};

        for (let e in pageData["pages"]) {
            try {
                const mdResponse = await fetch(`../logs/${e}.md`);
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

        lastModifiedArr = Object.fromEntries(Object.entries(lastModifiedArr)
            .sort((a, b) => new Date(b[1]) - new Date(a[1])));
        for (let e in lastModifiedArr) {
            let el = document.getElementById(`page-${e}`);
            el.parentElement.appendChild(document.getElementById(`page-${e}`));
        }

    } catch (error) {
        console.log("Error fetching pages data:", error);
    }
}
fetchPageData();