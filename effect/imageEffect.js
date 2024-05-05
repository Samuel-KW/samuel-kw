
class AsciiImage extends HTMLElement {

    // static observedAttributes = ["src", "speed"];

    constructor() {
        super();

        this.gradient = "@#&8o:. "; // From light to dark

        this._img = document.createElement("img");

        this._c = document.createElement("canvas");
        this._ctx = this._c.getContext("2d");
    
        this.src = null;
        this.width = null;
        this.height = null;
    }
    
    loadImage (img) {

        // Draw the image to the canvas
        this._ctx.drawImage(img, 0, 0);
        
        // Get the image data
        const data = this._ctx.getImageData(0, 0, img.width, img.height);
        const pixels = data.data;

        // Clear the canvas before drawing
        this._ctx.clearRect(0, 0, img.width, img.height);

        // Width and height of each chunk
        const chunkWidth = 15;
        const chunkHeight = 20;

        // How many pixels to skip
        const skip = 5;

        // Divide image into chunks
        const rowChunks = Math.ceil(data.width / chunkWidth); // Each X chunk is 15 pixels wide
        const columnChunks = Math.ceil(data.height / chunkHeight); // Each Y chunk is 20 pixels tall

        // Loop through each chunk
        for (let i = 0; i < rowChunks * columnChunks; ++i) {
            
            // Get the chunk's position
            const chunkX = i % rowChunks;
            const chunkY = Math.floor(i / rowChunks);

            // Average grayscale color of the chunk
            let avg = 0,
                total = 0;

            // Loop through each pixel in the chunk
            for (let j = 0; j < chunkHeight; j += skip) {

                // Get pixel position from chunk Y position
                const y = chunkY * chunkHeight + j;

                for (let k = 0; k < chunkWidth; k += skip) {

                    // Get pixel position from chunk X position
                    const x = chunkX * chunkWidth + k;

                    // Get index of pixel in the data array
                    const index = (y * data.width + x) * 4;

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
            this._ctx.font = "20px consolas";
            this._ctx.fillStyle = 'black';
            this._ctx.fillText(this.gradient[Math.floor(avg / threshold)], chunkX * chunkWidth, chunkY * chunkHeight);
        }

        return data;
    }

    connectedCallback() {

        const shadow = this.attachShadow({ mode: "open" });

        this.src = this.getAttribute("src");
        this.width = this.getAttribute("width") ?? 256;
        this.height = this.getAttribute("height") ?? 256;

        this._c.width = this.width;
        this._c.height = this.height;

        this._img = new Image(); 
        this._img.onload = () => {
            
            console.time("loadImage");
            const data = this.loadImage(this._img);
            // this._ctx.putImageData(data, 0, 0);
            console.timeEnd("loadImage");

            setTimeout(() => {
                this._img.classList.add("loaded");
            }, 1000);
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
window.customElements.define("ascii-img", AsciiImage);
