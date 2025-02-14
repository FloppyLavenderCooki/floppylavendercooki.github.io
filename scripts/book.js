fetch("../logs/book_gen/book1.txt").then((response) => response.text()).then((data) => {
    document.getElementById("name").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())] + " ";
    fetch("../logs/book_gen/book2.txt").then((response) => response.text()).then((data) => {
        document.getElementById("name").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())] + " ";
        fetch("../logs/book_gen/book3.txt").then((response) => response.text()).then((data) => {
            document.getElementById("name").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())];
        })
    })
})

document.getElementById("author").textContent = "by "
fetch("../logs/book_gen/name1.txt").then((response) => response.text()).then((data) => {
    document.getElementById("author").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())] + ". ";
    fetch("../logs/book_gen/name2.txt").then((response) => response.text()).then((data) => {
        document.getElementById("author").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())];
        fetch("../logs/book_gen/name3.txt").then((response) => response.text()).then((data) => {
            document.getElementById("author").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())];
        })
    })
})