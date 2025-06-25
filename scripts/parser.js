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

    for (const altImage of document.querySelectorAll("#page img.alt-image")) {
        altImage.draggable = false;

        altImage.onpointerenter = (e) => {
            console.log(e);
        }

        altImage.addEventListener("pointerenter", (e) => {
            altImage.setPointerCapture(e.pointerId);
            altImage.style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, var(--hover-color) 0%, var(--hover-inactive-color) 50%)`;
            altImage.style.transform = `perspective(500px) translateZ(20px) rotate3d(${(e.offsetY/altImage.clientHeight)-0.5}, ${-(e.offsetX/altImage.clientWidth)+0.5}, 0, 5deg)`
        });

        altImage.addEventListener("pointermove", (e) => {
            console.log("moving");
            altImage.style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, var(--hover-color) 0%, var(--hover-inactive-color) 50%)`;
            altImage.style.transform = `perspective(500px) translateZ(20px) rotate3d(${(e.offsetY/altImage.clientHeight)-0.5}, ${-(e.offsetX/altImage.clientWidth)+0.5}, 0, 5deg)`
        });

        altImage.addEventListener("pointerdown", (e) => {
            console.log("Pointer down on alt image");
            altImage.style.transform = `perspective(500px) translateZ(-200px) rotate3d(${(e.offsetY/altImage.clientHeight)-0.5}, ${-(e.offsetX/altImage.clientWidth)+0.5}, 0, -2.5deg)`
        });

        altImage.addEventListener("pointerup", (e) => {
            altImage.style.transform = `perspective(500px) translateZ(20px) rotate3d(${(e.offsetY/altImage.clientHeight)-0.5}, ${-(e.offsetX/altImage.clientWidth)+0.5}, 0, 5deg)`
        });

        altImage.addEventListener("pointerleave", (e) => {
            altImage.releasePointerCapture(e.pointerId);
            altImage.style.background = "";
            altImage.style.transform = ""
        });
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