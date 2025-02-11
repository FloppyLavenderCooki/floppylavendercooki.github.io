fetch("logs/index.md").then((response) => {
    response.text().then((data) => {
        parse(data);
    })
});

const title = document.getElementById("title");
const page = document.getElementById("page");

function parse(data) {
    sectionHTML = marked.parse(data);
    page.innerHTML = sectionHTML;
    page.getElementsByTagName("h1")[0].id = "title";
    page.getElementsByTagName("h1")[0].className = "rubik-800";
}