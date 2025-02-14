let canvas = document.getElementById("canvas");
canvas.style.opacity = "0.1";
let ctx = canvas.getContext("2d",{ willReadFrequently: true });
ctx.imageSmoothingEnabled = false;
document.body.style.imageRendering = "pixelated";

let res = document.getElementById("res");
let aspectX = document.getElementById("aspect-x");
let aspectY = document.getElementById("aspect-y");
let resolution = res.value;
let width = aspectX.value * resolution;
let height = aspectY.value * resolution;

canvas.width = width;
canvas.height = height;
canvas.style.width = width+"px";
canvas.style.height = height+"px";

const full_ramp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const mini_ramp = " .:-=+*#%@";
let full_text = "";

let file = null;
let zip = null;

document.getElementById("img").onchange = (e) => {
    if (e.target.files[0].type === "application/x-zip-compressed") {
        const ext_zip = new JSZip();
        ext_zip.loadAsync( e.target.files[0])
            .then(async function (ext_zip) {
                zip = ext_zip;

                let keys = Object.keys(zip.files)
                for (const file_key of keys) {
                    const image = new Image(width, height);

                    image.onload = drawImageActualSize;

                    file = zip.files[file_key];

                    const blob = await file.async("blob");
                    image.src = URL.createObjectURL(blob);
                }
            }, function() { alert("Not a valid zip file") });
    } else {
        zip = null;

        const image = new Image(width, height);
        image.onload = drawImageActualSize;
        file = e.target.files[0];
        image.src = URL.createObjectURL(file);
    }
}

let reload = () => {
    localStorage.setItem("colour", document.getElementById("colour").checked);

    resolution = res.value;
    width = aspectX.value * resolution;
    height = aspectY.value * resolution;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width+"px";
    canvas.style.height = height+"px";

    const image = new Image(width, height);
    image.onload = drawImageActualSize;
    image.src = URL.createObjectURL(file);
}

document.getElementById("res").onchange = reload;
document.getElementById("aspect-x").onchange = reload;
document.getElementById("aspect-y").onchange = reload;

if (localStorage.getItem("colour")) {
    document.getElementById("colour").checked = true;
}
document.getElementById("colour").onchange = reload;

const brightness = document.getElementById("brightness");
brightness.onchange = reload;

let newLine = false;
function drawImageActualSize() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

    const frame = ctx.getImageData(0, 0, this.width, this.height);
    const data = frame.data;
    // console.log(data);

    if (zip === null) {
        document.getElementById("ascii").innerHTML = "";
        full_text = "";
    }

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        let bw = (r+g+b) / 3

        if (newLine) {
            full_text += "\n";
            newLine = false;
        }

        if (((i / 4) + 1) % width === 0) {
            newLine = true;
        }

        // FULL
        // let full_ramp_text = full_ramp[Math.round((bw / 255) * (full_ramp.length - 1))];
        // if (document.getElementById("colour").checked) {
        //     full_text += `<span style="color: rgb(${r}, ${g}, ${b})">${full_ramp_text}</span>`;
        // } else {
        //     full_text += full_ramp_text;
        // }

        // MINI
        let mini_ramp_text = mini_ramp[Math.floor(bw / 255 * (mini_ramp.length - 2))];
        if (document.getElementById("colour").checked) {
            full_text += `<span style="color: rgb(${r + brightness.value*(bw / 255)}, ${g + brightness.value*(bw / 255)}, ${b + brightness.value*(bw / 255)})">${mini_ramp_text}</span>`;
        } else {
            full_text += mini_ramp_text;
        }
    }
    document.getElementById("ascii").innerHTML = full_text;

    console.log("BR");
    document.getElementById("ascii").innerHTML += "\n";
}