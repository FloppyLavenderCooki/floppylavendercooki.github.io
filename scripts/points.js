let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.width;

fetch("../logs/points.txt").then((data) => {
    data.text().then((data) => {
        let points = JSON.parse(
            data.replace(/\((\d+),\s*(\d+)\)/g, '[$1, $2]')
        ).map(([x, y]) => ({ x, y }));
        console.log(points);

        let drawWidth = canvas.width/Math.max(...points.map(point => point.x));
        let drawHeight = canvas.height/Math.max(...points.map(point => point.x));

        // ctx.fillStyle = "#ffa500";
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 15;

        ctx.beginPath();
        ctx.moveTo(points[0].x * drawWidth, canvas.height - points[0].y * drawHeight);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x * drawWidth, canvas.height - points[i].y * drawHeight);
        }

        ctx.save();
        ctx.clip();
        ctx.lineWidth *= 2;
        // ctx.fill();
        ctx.stroke();
        ctx.restore();
    })
})
