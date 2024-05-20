const delay = delay => new Promise((resolve, reject) => setTimeout(resolve, delay));


class AsciiImage extends HTMLElement {

    // static observedAttributes = ["src", "speed"];

    constructor() {
        super();

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

        // this.bin = null;
        // this.module = null;
        // this.memory = new WebAssembly.Memory({ initial: 1, maximum: 256 });
        
    }
    
    async loadImage (img, speed=10, timeout=10) {

        // Load the WebAssembly module
        // this.bin = await (await fetch("ascii.wasm")).arrayBuffer();
        // this.module = new WebAssembly.Module(this.bin);

        // Draw the image to the canvas
        this._ctx.drawImage(img, 0, 0, img.width * (1 / this.scale), img.height * (1 / this.scale), 0, 0, img.width, img.height);

        // Get the image data
        const data = this._ctx.getImageData(0, 0, img.width, img.height);
        const pixels = data.data;

        const iterations = 1;

        // Clear the canvas before drawing
        this._ctx.fillStyle = "#ffffff";
        this._ctx.fillRect(0, 0, this._c.width, this._c.height);

        this._ctx.font = "20px consolas";
        this._ctx.fillStyle = "#000000";
        this._ctx.letterSpacing = "4px";

        await this.pixelsToAsciiV5(pixels, data.width, data.height);

        // console.time("method 5");
        // for (let i = 0; i < iterations; ++i)
        //     this.pixelsToAsciiV5(pixels, data.width, data.height);
        // console.timeEnd("method 5");

        // console.time("method 4");
        // for (let i = 0; i < iterations; ++i)
        //     this.pixelsToAsciiV4(pixels, data.width, data.height);
        // console.timeEnd("method 4");

        // console.time("method 3");
        // for (let i = 0; i < iterations; ++i)
        //     this.pixelsToAsciiV3(pixels, data.width, data.height);
        // console.timeEnd("method 3");

        // console.time("method 2");
        // for (let i = 0; i < iterations; ++i)
        //     this.pixelsToAsciiV2(pixels, data.width, data.height);
        // console.timeEnd("method 2");

        // console.time("method 1");
        // for (let i = 0; i < iterations; ++i)
        //     this.pixelsToAscii(pixels, data.width, data.height);
        // console.timeEnd("method 1");

        return data;
    }

    /* 
        Method to convert pixels to ASCII with basic sampling
    */
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
                }
            }

            // Average the chunk colors
            avg /= total;
            
            // Calculate the threshold for each character
            const threshold = 256 / this.gradient.length;
            
            // write ascii character to canvas at position
            
            // this._ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;
            // this._ctx.fillRect(chunkX * chunkWidth, chunkY * chunkHeight, chunkWidth, chunkHeight);
            // this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], chunkX * chunkWidth, chunkY * chunkHeight);
        }
    }

    /*
        Optimized method to convert pixels to ASCII using specific 2 pixel sampling
    */
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
            // this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], baseX, baseY);
        }
    }

    /*
        Optimized method to convert pixels to ASCII using bitwise operations
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
            const chunkY = i / rowChunks | 0;            

            const baseX = chunkX * chunkWidth;
            const baseY = chunkY * chunkHeight;

            // Get the index of the first pixel in the chunk
            const index1 = ((baseY + sampleOffsetY1) * width + baseX + sampleOffsetX1);
            const index2 = ((baseY + sampleOffsetY2) * width + baseX + sampleOffsetX2);

            // Find overage of two pixels
            const avg = ( (((pixels[index1] ^ pixels[index2]) & 0xfefefefe) >> 1) + (pixels[index1] & pixels[index2]) ) & 0xff;

            // Doesn't save almost any computation time
            // this._ctx.fillText(this.gradient[avg >> 5], baseX, baseY);
            this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], baseX, baseY);

            // this._ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;
            // this._ctx.fillRect(baseX, baseY, chunkWidth, chunkHeight);
        }
    }

    /*
        Optimized method to convert pixels to ASCII using WebAssembly
    */
    pixelsToAsciiV4(pixelsUint8, width, height) {
        const pixels = new Uint32Array(pixelsUint8.buffer);

        if (pixels.byteLength > this.memory.buffer.byteLength) {
            const curr = this.memory.buffer.byteLength >> 16; // Get current number of pages
            const pages = Math.round(width * height * 4 / 65536) - curr; // Pages to add
            this.memory.grow(pages); 
        }
        
        const memoryPixel = new Uint32Array(this.memory.buffer);
        memoryPixel.set(pixels);

        const instance = new WebAssembly.Instance(this.module, { env: { img: this.memory } });
        
        console.log(pixels.buffer);
        
        const length = instance.exports.imgToAscii(pixels.length, width, height);
        const buff = new Uint8Array(this.memory.buffer);
        const asciiWidth = buff[length];
        const asciiHeight = length / asciiWidth;

        const threshold = 256 / this.gradient.length;

        for (let i = 0; i < length; ++i) {
            const x = i % asciiWidth;
            const y = i / asciiWidth | 0;
            
            this._ctx.fillText(this.gradient[(buff[i] / threshold) | 0], x * 15, y * 20);
        }

        console.log(buff, asciiWidth, asciiHeight, length);
    }

    /*
        Optimized method to convert pixels to ASCII using bitwise operations and better chunk sampling
    */
    async pixelsToAsciiV5(pixelsUint8, width, height) {

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

        // Get the chunk's position
        let chunkX = 0;
        let chunkY = 0;
        let chars = "";

        // Loop through each chunk
        for (let i = 0; i < rowChunks * columnChunks; ++i) {
            
            const baseX = chunkX * chunkWidth;
            const baseY = chunkY * chunkHeight;

            // Get the index of the first pixel in the chunk
            const index1 = ((baseY + sampleOffsetY1) * width + baseX + sampleOffsetX1);
            const index2 = ((baseY + sampleOffsetY2) * width + baseX + sampleOffsetX2);

            // Find overage of two pixels
            const avg = ( (((pixels[index1] ^ pixels[index2]) & 0xfefefefe) >> 1) + (pixels[index1] & pixels[index2]) ) & 0xff;

            chars += this.gradient[Math.floor(avg / threshold)];

            chunkX++;
            if (chunkX >= rowChunks) {
                this._ctx.fillText(chars, 0, baseY);
                await delay(10);
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

        this.style.display = "inline-block";
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";

        this._c.width = this.width;
        this._c.height = this.height;

        this._img = new Image(); 
        this._img.onload = async () => {
            
            const data = await this.loadImage(this._img, this._img.width, 1);
            
            this._img.classList.add("loaded");

            // this._ctx.putImageData(data, 0, 0);

        }
        this._img.width = this.width;
        this._img.height = this.height;
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


