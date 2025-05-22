let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.oncontextmenu = (e) => {
    e.preventDefault();
}

const canvas_size = canvas.clientWidth;

canvas.width = canvas_size;
canvas.height = canvas_size;

// canvas.style.marginLeft = `${canvas.width}px`;

let offsetX = 4;
let offsetY = 4;
let hilbertCurve;
let maze = {};
let drawWidth;
let drawHeight;

function drawPoints() {
    ctx.strokeStyle = "#ff00ff";
    ctx.lineWidth = drawWidth/16;

    ctx.beginPath();
    ctx.moveTo(hilbertCurve[0].x * drawWidth + offsetX, hilbertCurve[0].y * drawHeight + offsetY);
    for (let i = 1; i < hilbertCurve.length; i++) {
        ctx.lineTo(hilbertCurve[i].x * drawWidth + offsetX, hilbertCurve[i].y * drawHeight + offsetY);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
}

fetch("../logs/tools/points.txt").then((data) => {
    data.text().then((data) => {
        hilbertCurve = JSON.parse(
            data.replaceAll("(","[")
                .replaceAll(")","]")
        ).map(([x, y]) => ({ x, y }));
        // console.log(points);

        drawWidth = canvas.width/Math.max(...hilbertCurve.map(point => point.x)) - offsetX;
        drawHeight = canvas.height/Math.max(...hilbertCurve.map(point => point.y)) - offsetY;

        let pos = {
            x: Math.max(...hilbertCurve.map(point => point.x)),
            y: Math.max(...hilbertCurve.map(point => point.y))
        }

        getPoints(pos);

        for (let i = 0; i < hilbertCurve.length-1; i++) {
            maze[i] = hilbertCurve[i];
        }

        drawPoints();
    })
});

function getPoint(pos) {
    let point = hilbertCurve.findIndex(obj => obj.x === pos.x && obj.y === pos.y);
    if (hilbertCurve[point]) {
        return hilbertCurve[point];
    } else {
        return {x: false, y: false};
    }
}

function getPoints(pos) {
    let points = [
        [{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}],
        [{x:-1,y:0},{x:0,y:0},{x:1,y:0}],
        [{x:-1,y:1},{x:0,y:1},{x:1,y:1}]
    ]

    console.log(points, points.length, points[0].length);
    for (let y = 0; y < points.length - 1; y++) {
        for (let x = 0; x < points[y].length - 1; x++) {
            console.log(points, points.length, points[0].length)
            let point = points[y][x];
            points[y][x] = getPoint({x:pos.x+point.x, y:pos.y+point.y});
        }
    }

    console.log(points);
}

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
    if (e.code === "KeyR" || e.code === "Space") {
        e.preventDefault();
        offsetX = 4;
        offsetY = 4;
        drawPoints();
    }
}
