class Ring extends HTMLElement {
    constructor() {

        // Always call super first in constructor
        super();

        const stroke = Number(this.getAttribute('stroke')) ?? 5;
        const radius = Number(this.getAttribute('radius')) ?? 25;
        const color = this.getAttribute('color') ?? '#b43bff';

        this._size = stroke + radius * 2;
        this._circumference = 2 * Math.PI * radius;

        this._root = this.attachShadow({ mode: 'open' });
        this._root.innerHTML = `
        <svg height="${this._size}" width="${this._size}" >
           <circle
             stroke="${color}"
             stroke-dasharray="${this._circumference} ${this._circumference}"
             style="stroke-dashoffset:${this._circumference}"
             stroke-width="${stroke}"
             fill="transparent"
             r="${radius}"
             cx="${this._size / 2}"
             cy="${this._size / 2}"
          />
        </svg>
  
        <style>
          circle {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
          }
        </style>`;
    }

    setProgress(percent) {
        const offset = this._circumference - (percent / 100 * this._circumference);

        this._root.querySelector('circle').style.strokeDashoffset = offset;
    }

    static get observedAttributes() {
        return ['progress'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress')
            this.setProgress(newValue);
    }
}

window.customElements.define('ds-ring', Ring);