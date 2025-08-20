function drawGridWithLabels() {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        setTimeout(drawGridWithLabels, 100);
        return;
    }

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const spacing = 50;

    ctx.save();
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";

    // Draw vertical grid lines and x-axis labels
    for (let x = 0; x <= width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.fillText(x.toString(), x + 2, 10);
    }

    // Draw horizontal grid lines and y-axis labels
    for (let y = 0; y <= height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.fillText(y.toString(), 2, y - 2);
    }

    ctx.restore();
}

// Wait for the canvas to be initialized
window.addEventListener("load", drawGridWithLabels);
