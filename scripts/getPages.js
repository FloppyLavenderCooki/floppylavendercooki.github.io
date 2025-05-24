// let pageData = {};
// let description = document.getElementById("description");
let pages = document.getElementById("pages");
let final = document.getElementById("final");
let tools = document.getElementById("tools");
const sort = document.getElementById("sort");
sort.onchange = () => {
    localStorage.setItem("sort", sort.value);
    pages.innerHTML = "";
    final.innerHTML = "";
    tools.innerHTML = "";
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
    a.href = `view/?page=${e}`;
    a.id = `page-${e}`;

    let div = document.createElement("div");
    div.className = "blog-page";

    let title = document.createElement("span");
    title.className = "title-a";
    title.innerText = `${e.replaceAll("final/","").replaceAll("tools/","")}`;

    let descSpan = document.createElement("span");
    descSpan.className = "desc-span";
    descSpan.innerText = pageData["pages"][e];

    div.append(title, document.createElement("br"), descSpan);
    a.appendChild(div);
    if (e.includes("tools/")) {
        tools.appendChild(a);
    } else if (e.includes("final/")) {
        final.appendChild(a);
    } else {
        pages.appendChild(a);
    }
}

async function fetchPageData() {
    try {
        const response = await fetch(`../logs/pages.json`);
        const pageData = await response.json();

        if (JSON.parse(localStorage.getItem("lastModifiedArr"))) {
            let lastModifiedArrTemp = Object.fromEntries(Object.entries(JSON.parse(localStorage.getItem("lastModifiedArr")))
                .sort((a, b) => new Date(b[1]) - new Date(a[1])));

            for (let e in lastModifiedArrTemp) {
                makePage(e, pageData);
            }
        }

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
                localStorage.setItem("lastModifiedArr", JSON.stringify(lastModifiedArr));

                pages.innerHTML = "";
                final.innerHTML = "";
                tools.innerHTML = "";
                for (let e in lastModifiedArr) {
                    makePage(e, pageData);
                }
                break;
            default:
                pages.innerHTML = "";
                final.innerHTML = "";
                tools.innerHTML = "";
                for (let e in pageData["pages"]) {
                    makePage(e, pageData);
                }
                break;
        }
        document.getElementById("final-h1").style.visibility = "visible";
        document.getElementById("tool-h1").style.visibility = "visible";

        for (const blogPage of document.getElementsByClassName("blog-page")) {
            blogPage.addEventListener("pointerenter", function (e) {
                blogPage.setPointerCapture(e.pointerId);
                blogPage.style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, var(--hover-color) 0%, var(--hover-inactive-color) 50%)`;
                blogPage.style.transform = `perspective(500px) translateZ(20px) rotate3d(${(e.offsetY/blogPage.clientHeight)-0.5}, ${-(e.offsetX/blogPage.clientWidth)+0.5}, 0, 5deg)`
            });

            blogPage.addEventListener("pointermove", function (e) {
                blogPage.style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, var(--hover-color) 0%, var(--hover-inactive-color) 50%)`;
                blogPage.style.transform = `perspective(500px) translateZ(20px) rotate3d(${(e.offsetY/blogPage.clientHeight)-0.5}, ${-(e.offsetX/blogPage.clientWidth)+0.5}, 0, 5deg)`
            });

            blogPage.addEventListener("pointerdown", function (e) {
                blogPage.style.transform = `perspective(500px) translateZ(0px) rotate3d(${(e.offsetY/blogPage.clientHeight)-0.5}, ${-(e.offsetX/blogPage.clientWidth)+0.5}, 0, -2.5deg)`
            })

            blogPage.addEventListener("pointerup", function (e) {
                blogPage.style.transform = `perspective(500px) translateZ(20px) rotate3d(${(e.offsetY/blogPage.clientHeight)-0.5}, ${-(e.offsetX/blogPage.clientWidth)+0.5}, 0, 5deg)`
            })

            blogPage.addEventListener("pointerleave", function (e) {
                blogPage.releasePointerCapture(e.pointerId);
                blogPage.style.background = "";
                blogPage.style.transform = ""
            });
        }
    } catch (error) {
        console.log("Error fetching pages data:", error);
    }
}
fetchPageData();