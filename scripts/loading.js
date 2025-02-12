let loading = setInterval(spin, 100);

function spin() {
    console.log("Loading...");
}

function stopSpin() {
    clearInterval(loading);
}

window.onload = stopSpin;