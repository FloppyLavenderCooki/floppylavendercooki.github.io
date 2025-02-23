function random(thing) {
    if (thing === "number") {
        return Math.floor(Math.random()*10).toString()
            .replaceAll("1", "One")
            .replaceAll("2", "Two")
            .replaceAll("3", "Three")
            .replaceAll("4", "Four")
            .replaceAll("5", "Five")
            .replaceAll("6", "Six")
            .replaceAll("7", "Seven")
            .replaceAll("8", "Eight")
            .replaceAll("9", "Nine")
            .replaceAll("10", "Ten");
    } else {
        return thing.split("\r\n")[Math.floor(thing.split("\r\n").length * Math.random())];
    }
}

fetch("../logs/tools/book_gen/formats.txt").then((response) => response.text()).then((format) => {
    fetch("../logs/tools/book_gen/noun.txt").then((response) => response.text()).then((noun) => {
        fetch("../logs/tools/book_gen/plural_noun.txt").then((response) => response.text()).then((plural_noun) => {
            fetch("../logs/tools/book_gen/adjective.txt").then((response) => response.text()).then((adjective) => {
                fetch("../logs/tools/book_gen/verb.txt").then((response) => response.text()).then((verb) => {
                    document.getElementById("name").textContent += random(format)
                        .replaceAll("{{noun}}", random(noun))
                        .replaceAll("{{adjective}}", random(adjective))
                        .replaceAll("{{number}}", random("number"))
                        .replaceAll("{{plural_noun}}", random(plural_noun))
                        .replaceAll("{{verb}}", random(verb));
                    document.getElementById("author").textContent += "By " + random(noun);
                })
            })
        })
    })
})