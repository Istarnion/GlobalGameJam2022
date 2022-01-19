const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

/**
 * CanvasRenderingContext with a few additions
 */
type Graphics = CanvasRenderingContext2D & {
    width: number,
    height: number,
    setGameSize: Function,
    clear: Function,
    drawLine: Function
};

const gfx = canvas.getContext("2d") as Graphics;

function disableAntiAlias() {
    gfx.imageSmoothingEnabled = false;
}

const pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;

gfx.scale(pixelRatio, pixelRatio);
gfx.save();

gfx.width = canvas.clientWidth;
gfx.height = canvas.clientHeight;

let lastResize = 0;
function onResize() {
    const now = performance.now();
    if(now - lastResize < 10) return;
    lastResize = now;
    console.log('resize');

    const w = window.innerWidth;
    const h = window.innerHeight;

    const wantedRatio = gfx.width / gfx.height;
    const currRatio = w / h;

    let scale = 1;

    if(currRatio >= wantedRatio) {
        scale = h / gfx.height;
    }
    else {
        scale = w / gfx.width;
    }

    if(scale > 1) scale = Math.floor(scale);

    canvas.width = (gfx.width * scale) * pixelRatio;
    canvas.height = (gfx.height * scale) * pixelRatio;
    canvas.style.width = `${gfx.width * scale}px`;
    canvas.style.height = `${gfx.height * scale}px`;

    gfx.restore();
    gfx.save();
    gfx.scale(scale * pixelRatio, scale * pixelRatio);
    disableAntiAlias();
}

window.addEventListener('resize', onResize);

/**
 * Set the logical size of the game canvas. The actual size
 * will dynamically try to be as large as possible while
 * maintaining integer scaling.
 * @param width With in pixels
 * @param height Height in pixels
 */
gfx.setGameSize = function(width: number, height: number): void {
    this.width = width;
    this.height = height;
    onResize();
}

/**
 * Clear the canvas
 * @param clearColor The color to clear to
 */
gfx.clear = function(clearColor: string): void {
    this.fillStyle = clearColor;
    this.clearRect(0, 0, gfx.width, gfx.height);
    this.fillRect(0, 0, gfx.width, gfx.height);
}

gfx.drawLine = function(xFrom: number, yFrom: number, xTo: number, yTo: number): void {
    this.beginPath();
    this.moveTo(xFrom, yFrom);
    this.lineTo(xTo, yTo);
    this.closePath();
    this.stroke();
}

export default gfx;
