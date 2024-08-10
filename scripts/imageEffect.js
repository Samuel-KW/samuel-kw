if (!window.delay) window.delay = delay => new Promise((resolve, reject) => setTimeout(resolve, delay));


class AsciiImage extends HTMLElement {

    constructor() {
        super();

        this.gradient = "@%8o=-. ";

        this._img = document.createElement("img");
        this._container = document.createElement("div");

        this._c = document.createElement("canvas");
        this._ctx = this._c.getContext("2d", { antialias: false, depth: false });
    
        this.src = null;
        this.width = null;
        this.height = null;
        this.scale = 1;
        this.alt = "ASCII Image";
        this.color = "#000000";
    }
    
    async loadImage (img, speed=10) {

        const width = img.width;
        const height = img.height;

        // Draw the image to the canvas
        this._ctx.drawImage(img, 0, 0, width, height);
        
        // Get the image data
        const data = this._ctx.getImageData(0, 0, width, height);
        const pixels = data.data;

        // Clear the canvas before drawing
        this._ctx.clearRect(0, 0, width, height);

        // Convert the pixels to ASCII
        await this.pixelsToAscii(pixels, width, height, speed);

        return data;
    }

    /*
        Optimized method to convert pixels to ASCII using bitwise operations and better chunk sampling
    */
    async pixelsToAscii(pixelsUint8, width, height, speed) {

        const fontSize = 8;

        // Set the font and color
        this._ctx.font = fontSize + "px consolas";
        this._ctx.fillStyle = this.color;
        // this._ctx.letterSpacing = "0px";

        const pixels = new Uint32Array(pixelsUint8.buffer);

        // Calculate the threshold for each character
        const threshold = 256 / this.gradient.length;

        // Width and height of each chunk
        const charWidth = this._ctx.measureText(this.gradient).width / this.gradient.length;
        const charHeight = fontSize;

        // Sample offsets for each character chunk
        const sampleOffsetX1 = 1;
        const sampleOffsetY1 = 1;

        const sampleOffsetX2 = charWidth - 1;
        const sampleOffsetY2 = charHeight - 1;

        // Divide image into chunks
        const rowChunks = Math.ceil(width / charWidth);
        const columnChunks = Math.ceil(height / charHeight);

        // How long to wait between drawing each row
        const rowDelta = speed / columnChunks;

        // Get the chunk's position
        let chunkX = 0;
        let chunkY = 0;
        let chars = "";

        // Loop through each chunk
        for (let i = 0; i < rowChunks * columnChunks; ++i) {
            
            const baseX = chunkX * charWidth;
            const baseY = chunkY * charHeight;
            
            let posOffsetX1 = baseX + sampleOffsetX1,
                posOffsetY1 = baseY + sampleOffsetY1;

            let posOffsetX2 = baseX + sampleOffsetX2,
                posOffsetY2 = baseY + sampleOffsetY2;

            // Clamp the values
            if (posOffsetX2 >= width)  posOffsetX2 = width  - 1;
            if (posOffsetY2 >= height) posOffsetY2 = height - 1;

            // Get the index of the first pixel in the chunk
            const index1 = (posOffsetY1 * width + posOffsetX1) << 0;
            const index2 = (posOffsetY2 * width + posOffsetX2) << 0;

            // Get the individual pixel values
            const p1 = pixels[index1];
            const p2 = pixels[index2];

            // Find overage of two pixels
            const avg = ( (((p1 ^ p2) & 0xFEFEFEFE) >> 1) + (p1 & p2) ) & 0xFF;
            chars += this.gradient[Math.floor(avg / threshold)];

            // this._ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;
            // this._ctx.fillRect(baseX, baseY, charWidth, charHeight);

            chunkX++;
            if (chunkX >= rowChunks) {
                // this._ctx.fillStyle = this.color;
                this._ctx.fillText(chars, 0, baseY + charHeight / 2);

                await delay(rowDelta);

                chars = "";
                chunkX = 0;
                chunkY++;
            }
        }
    }

    connectedCallback() {

        const shadow = this.attachShadow({ mode: "open" });

        this.src = this.getAttribute("src");
        this.scale = Number(this.getAttribute("scale") ?? 1);
        this.width = (this.getAttribute("width") ?? 256) * this.scale;
        this.height = (this.getAttribute("height") ?? 256) * this.scale;
        this.color = (this.getAttribute("color") ?? "#000000");
        
        this._c.width = this.width;
        this._c.height = this.height;

        this._img = new Image(); 
        this._img.onload = async () => {
            
            await this.loadImage(this._img, 500);
            this._img.classList.add("loaded");
        }

        this._img.width = this.width;
        this._img.height = this.height;
        this._img.src = this.src;
        
        const style = document.createElement("style");
        style.textContent = `

            div {
                display: grid;
            }

            div > * {
                grid-area: 1/1;
            }

            canvas {
                z-index: 1;
            }

            img {
                transition: opacity 1s ease;
                z-index: 2;
                opacity: 0;
            }

            img.loaded {
                opacity: 1;
            }
        `;


        shadow.appendChild(style);
        shadow.appendChild(this._container);
        
        this._container.appendChild(this._c);
        this._container.appendChild(this._img);
    }
}

window.customElements.define("ascii-img", AsciiImage);