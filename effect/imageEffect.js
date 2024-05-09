const delay = delay => new Promise((resolve, reject) => setTimeout(resolve, delay));


class AsciiImage extends HTMLElement {

    // static observedAttributes = ["src", "speed"];

    constructor() {
        super();

        // From dark to light, must be 4, 8, 16, 32, etc characters long
        this.gradient = "@%8o=-. ";
        // this.gradient = "@%#+=-. "; 
        // this.gradient = "@#%&ʬ8֍+=-. ";
        // this.gradient = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@".split("").reverse().join("");

        this._img = document.createElement("img");

        this._c = document.createElement("canvas");
        this._ctx = this._c.getContext("2d", { alpha: false, antialias: false, depth: false });
    
        this.src = null;
        this.width = null;
        this.height = null;
    }
    
    async loadImage (img, speed=10, timeout=10) {


        // Draw the image to the canvas
        this._ctx.drawImage(img, 0, 0);
        
        // Get the image data
        const data = this._ctx.getImageData(0, 0, img.width, img.height);
        const pixels = new Uint32Array(data.data.buffer);
        
        window.pixels = pixels;
        console.log(pixels);

        // Clear the canvas before drawing
        this._ctx.fillStyle = "#ffffff";
        this._ctx.fillRect(0, 0, data.width, data.height);

        this._ctx.font = "20px consolas";
        this._ctx.fillStyle = "#000000";
        
        const bin = await (await fetch("ascii.wasm")).arrayBuffer();
        const module = new WebAssembly.Module(bin);

        const pages = Math.round(img.width * img.height * 4 / 65536);
        const memory = new WebAssembly.Memory({ initial: pages, maximum: 256 });
        const memoryPixel = new Uint32Array(memory.buffer);
        memoryPixel.set(pixels);

        const instance = new WebAssembly.Instance(module, { env: { img: memory } });
        
        console.time("new method");
        instance.exports.addOneMemory(0, pixels.length, img.width, img.height);
        console.timeEnd("new method");
        // pgm.instance.exports.addOneMemory(0, 10, 60, 100);

        // console.time("new method");
        // this.pixelsToAsciiV3(pixels, data.width, data.height);
        // console.timeEnd("new method");
        // this.pixelsToAscii(pixels, data.width, data.height);

        // console.time("new method");
        // for (let i = 0; i < 100; ++i)
        //     this.pixelsToAsciiNew(pixels, data.width, data.height);
        // console.timeEnd("new method");

        // console.time("old method");
        // for (let i = 0; i < 100; ++i)
        //     this.pixelsToAscii(pixels, data.width, data.height);
        // console.timeEnd("old method");

        return data;
    }

    pixelsToAscii(pixels, width, height) {


        // Width and height of each chunk
        const chunkWidth = 15;
        const chunkHeight = 20;

        // How many pixels to skip
        const skip = 5;

        // Divide image into chunks
        const rowChunks = Math.ceil(width / chunkWidth); // Each X chunk is 15 pixels wide
        const columnChunks = Math.ceil(height / chunkHeight); // Each Y chunk is 20 pixels tall

        // Loop through each chunk
        for (let i = 0; i < rowChunks * columnChunks; ++i) {
            
            // Get the chunk's position
            const chunkX = i % rowChunks;
            const chunkY = Math.floor(i / rowChunks);

            // Average grayscale color of the chunk
            let avg = 0,
                total = 0;

            //if (chunkX % speed == 0) await delay(timeout);

            // Loop through each pixel in the chunk
            for (let j = 0; j < chunkHeight; j += skip) {

                // Get pixel position from chunk Y position
                const y = chunkY * chunkHeight + j;
                
                for (let k = 0; k < chunkWidth; k += skip) {

                    // Get pixel position from chunk X position
                    const x = chunkX * chunkWidth + k;

                    // Get index of pixel in the data array
                    const index = (y * width + x) * 4;

                    // Optimally convert to grayscale
                    const grayscale = pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
                    if (isNaN(grayscale)) continue;

                    // Add value to the average
                    avg += grayscale;
                    total++;

                    // Set the new pixel values
                    pixels[index] = grayscale;
                    pixels[index + 1] = grayscale;
                    pixels[index + 2] = grayscale;
                }
            }

            // Average the chunk colors
            avg /= total;
            
            // Calculate the threshold for each character
            const threshold = 256 / this.gradient.length;
            
            // write ascii character to canvas at position
            
            // this._ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;
            // this._ctx.fillRect(chunkX * chunkWidth, chunkY * chunkHeight, chunkWidth, chunkHeight);
            this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], chunkX * chunkWidth, chunkY * chunkHeight);
        }
    }

    pixelsToAsciiV2(pixels, width, height) {

        // Calculate the threshold for each character
        const threshold = 256 / this.gradient.length;

        // Width and height of each chunk
        const chunkWidth = 15;
        const chunkHeight = 20;

        const sampleOffsetX1 = 4;
        const sampleOffsetY1 = 5;

        const sampleOffsetX2 = 11;
        const sampleOffsetY2 = 15;

        // Divide image into chunks
        const rowChunks = Math.ceil(width / chunkWidth); // Each X chunk is 15 pixels wide
        const columnChunks = Math.ceil(height / chunkHeight); // Each Y chunk is 20 pixels tall

        // Loop through each chunk
        for (let i = 0; i < rowChunks * columnChunks; ++i) {
            
            // Get the chunk's position
            const chunkX = i % rowChunks;
            const chunkY = Math.floor(i / rowChunks);

            //if (chunkX % speed == 0) await delay(timeout);

            const baseX = chunkX * chunkWidth;
            const baseY = chunkY * chunkHeight;

            // Get the index of the first pixel in the chunk
            const index1 = ((baseY + sampleOffsetY1) * width + baseX + sampleOffsetX1) << 2;
            const index2 = ((baseY + sampleOffsetY2) * width + baseX + sampleOffsetX2) << 2;

            const avg = (0.1495 * (pixels[index1] + pixels[index2])) + (0.2935 * (pixels[index1+1] + pixels[index2+1])) + (0.057 * (pixels[index1+2] + pixels[index2+2]));
            // 128.toString(16).padStart(2, 0);

            // this._ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;
            // this._ctx.fillRect(baseX, baseY, chunkWidth, chunkHeight);
            this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], baseX, baseY);
        }
    }

    /*

        Averaging the two pixels is not the best way to get the average color of the two pixels.

        The best way to get the average color of two pixels is to bitwise XOR the two pixels and then divide by 2.

    */

    pixelsToAsciiV3(pixelsUint8, width, height) {

        const pixels = new Uint32Array(pixelsUint8.buffer);


        // Calculate the threshold for each character
        const threshold = 256 / this.gradient.length;

        // Width and height of each chunk
        const chunkWidth = 15;
        const chunkHeight = 20;

        const sampleOffsetX1 = 4;
        const sampleOffsetY1 = 5;

        const sampleOffsetX2 = 11;
        const sampleOffsetY2 = 15;

        // Divide image into chunks
        const rowChunks = Math.ceil(width / chunkWidth); // Each X chunk is 15 pixels wide
        const columnChunks = Math.ceil(height / chunkHeight); // Each Y chunk is 20 pixels tall

        // Loop through each chunk
        for (let i = 0; i < rowChunks * columnChunks; ++i) {
            
            // Get the chunk's position
            const chunkX = i % rowChunks;
            const chunkY = Math.floor(i / rowChunks);

            //if (chunkX % speed == 0) await delay(timeout);

            const baseX = chunkX * chunkWidth;
            const baseY = chunkY * chunkHeight;

            // Get the index of the first pixel in the chunk
            const index1 = ((baseY + sampleOffsetY1) * width + baseX + sampleOffsetX1);
            const index2 = ((baseY + sampleOffsetY2) * width + baseX + sampleOffsetX2);

            // Find overage of two pixels
            const avg = ( (((pixels[index1] ^ pixels[index2]) & 0xfefefefe) >> 1) + (pixels[index1] & pixels[index2]) ) & 0xff;

            // this._ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;
            // this._ctx.fillRect(baseX, baseY, chunkWidth, chunkHeight);
            this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], baseX, baseY);
        }
    }

    connectedCallback() {

        const shadow = this.attachShadow({ mode: "open" });

        this.src = this.getAttribute("src");
        this.width = this.getAttribute("width") ?? 256;
        this.height = this.getAttribute("height") ?? 256;

        this._c.width = this.width;
        this._c.height = this.height;

        this._img = new Image(); 
        this._img.onload = async () => {
            
            const data = await this.loadImage(this._img, this._img.width, 1);
            
            
            // this._img.classList.add("loaded");

            // this._ctx.putImageData(data, 0, 0);

        }
        this._img.src = this.src;
        
        
        const style = document.createElement("style");
        style.textContent = `
            canvas {
                position: absolute;
                z-index: -1;
            }

            img {
                transition: opacity 1s ease;
                position: absolute;
                opacity: 0;
            }

            img.loaded {
                opacity: 1;
            }
        `;


        shadow.appendChild(style);
        shadow.appendChild(this._c);
        shadow.appendChild(this._img);
    }
}

// https://www.compuphase.com/graphic/scale3.htm
window.customElements.define("ascii-img", AsciiImage);

// WebAssembly.instantiateStreaming(fetch("ascii.wasm"), {}).then((obj) => {
//     console.log(obj.instance.exports.add(1, 2)); // "3"
// });


