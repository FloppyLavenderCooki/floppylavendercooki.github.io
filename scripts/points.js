let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.width;

let offsetX = 4;
let offsetY = 4;
let points;
let drawWidth;
let drawHeight;

function drawPoints() {
    ctx.strokeStyle = "#ff00ff";
    ctx.lineWidth = drawWidth/16;

    ctx.beginPath();
    ctx.moveTo(points[0].x * drawWidth + offsetX, points[0].y * drawHeight + offsetY);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x * drawWidth + offsetX, points[i].y * drawHeight + offsetY);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
}

fetch("../logs/tools/points.txt").then((data) => {
    data.text().then((data) => {
        points = JSON.parse(
            data.replaceAll("(","[")
                .replaceAll(")","]")
        ).map(([x, y]) => ({ x, y }));
        // console.log(points);

        drawWidth = canvas.width/Math.max(...points.map(point => point.x)) - offsetX;
        drawHeight = canvas.height/Math.max(...points.map(point => point.x)) - offsetY;

        drawPoints();
    })
});

let moving = false;

canvas.onpointermove = (e) => {
    if (moving) {
        offsetX += e.movementX;
        offsetY += e.movementY;

        drawPoints();
    }
}

canvas.onpointerdown = (e) => {
    moving = true;
    canvas.setPointerCapture(e.pointerId);
}

canvas.onpointerup = (e) => {
    moving = false;
    canvas.releasePointerCapture(e.pointerId);
}

window.onkeyup = (e) => {
    if (e.code === "KeyR") {
        e.preventDefault();
        offsetX = 4;
        offsetY = 4;
        drawPoints();
    }
}
