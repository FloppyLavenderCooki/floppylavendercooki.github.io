fetch("../logs/book1.txt").then((response) => response.text()).then((data) => {
    document.getElementById("name").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())] + " ";
    fetch("../logs/book2.txt").then((response) => response.text()).then((data) => {
        document.getElementById("name").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())] + " ";
        fetch("../logs/book3.txt").then((response) => response.text()).then((data) => {
            document.getElementById("name").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())];
        })
    })
})

document.getElementById("author").textContent = "by "
fetch("../logs/name1.txt").then((response) => response.text()).then((data) => {
    document.getElementById("author").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())] + ". ";
    fetch("../logs/name2.txt").then((response) => response.text()).then((data) => {
        document.getElementById("author").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())];
        fetch("../logs/name3.txt").then((response) => response.text()).then((data) => {
            document.getElementById("author").textContent += data.split("\r\n")[Math.floor(data.split("\r\n").length * Math.random())];
        })
    })
})