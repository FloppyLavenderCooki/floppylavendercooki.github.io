const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

fetch(`../logs/${urlParams.get("page")}.md`).then((response) => {
    response.text().then((data) => {
        parse(data);
    })
});

const title = document.getElementById("title");
const page = document.getElementById("page");

function parse(data) {
    let sectionHTML = marked.parse(data);

    let sectionHTMLTest = document.createElement("div");
    sectionHTMLTest.innerHTML = sectionHTML

    if (sectionHTMLTest.getElementsByTagName("img").length > 0) {
        page.innerHTML += "<div style='visibility: hidden'><br><br>" + sectionHTML + "</div>";
    } else {
        page.innerHTML += "<br><br>" + sectionHTML;
    }

    page.getElementsByTagName("h1")[0].id = "title";
    page.getElementsByTagName("h1")[0].className = "rubik-800";
    document.title = "Group 2 - " + urlParams.get("page");

    for (const script of page.getElementsByTagName("script")) {
        let scriptEl = document.createElement('script');
        scriptEl.setAttribute('src', script.src);
        document.body.appendChild(scriptEl);
        script.remove();
    }

    if (sectionHTMLTest.getElementsByTagName("img").length > 0) {
        let images = document.images,
            len = images.length,
            counter = 0;

        [].forEach.call( images, function( img ) {
            if(img.complete)
                incrementCounter();
            else
                img.addEventListener( 'load', incrementCounter, false );
        } );

        function incrementCounter() {
            counter++;
            if ( counter === len ) {
                document.getElementById("loading").remove();
                page.innerHTML = page.innerHTML.replaceAll('<div style="visibility: hidden">',"<div>");
            }
        }
    } else {
        document.getElementById("loading").remove();
    }

    if (typeof Prism !== 'undefined') {
        Prism.hooks.add('before-highlight', function (env) {
            env.element.setAttribute('data-language', env.language);
        });
        // Prism.highlightAll();

        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
            const block2 = block.cloneNode(true);
            fetch(`/img/scripts/${block2.getAttribute('data-filename')}`).then((response) => {
                response.text().then((data) => {
                    block2.innerHTML = data;
                    const pre = document.createElement('pre');
                    pre.style.display = 'none';
                    pre.appendChild(block2);

                    block.parentElement.parentElement.insertBefore(pre, block.parentElement);
                    block.parentElement.remove();
                    pre.style.display = 'block';

                    Prism.highlightElement(block2);
                });
            });
        });
    }
}