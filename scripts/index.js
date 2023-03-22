class Typer {
    constructor(element) {
        this.element = element;
        this.element.classList.add('typing-cursor');

        this.index = 0;
        this.chars = 'qwertyuiopasdfghjklzxcvbnm';
    }

    type_loop(resolve, text, speed, accuracy) {

        if (this.index >= text.length &&
            this.element.textContent == text) return resolve();

        if (this.element.textContent.slice(0, this.index) != text.slice(0, this.index)) {

            this.element.textContent = this.element.textContent.slice(0, -1);
            this.index--;

            return setTimeout(() => this.type_loop.apply(this, arguments), speed);
        }

        const is_mistake = Math.random() < accuracy;

        this.element.textContent += is_mistake ?
            this.chars[Math.floor(Math.random() * this.chars.length)] :
            text[this.index];

        this.index++;

        return setTimeout(() => this.type_loop.apply(this, arguments), speed * (is_mistake ? 3 : 1));
    }

    clean_loop(resolve, speed) {
        if (this.element.textContent == '')
            return resolve();

        this.element.textContent = this.element.textContent.slice(0, -1);
        return setTimeout(() => this.clean_loop.apply(this, arguments), speed);
    }

    clean(speed = 30) {
        return new Promise(resolve => this.clean_loop(resolve, speed));
    }

    type(text, speed = 30, accuracy = 0.05) {
        return new Promise(resolve => this.type_loop(resolve, text, speed, accuracy));
    }
}

const style = document.createElement('style');
style.textContent = `.typing-cursor::after { animation: cursor_blink 1s steps(1) infinite; display: inline-block; content: '_'; } @keyframes cursor_blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`;;
document.head.appendChild(style);

const handle = new Typer(document.getElementById('titles'));

let typing = ['3+ years of backend experience', '3+ years of UI/UX design', '3+ years of game development', '5+ years of frontend experience', 'software engineer', '3D artist'],
    index = 0;

const loop = () => {

    if (index >= typing.length) index = 0;

    handle.clean()
        .then(() => {
            handle.type(typing[index++], 50, 0.03)
                .then(() => setTimeout(loop, 4000));
        });

};

// Toggle menu
document.getElementById('toggle-menu').addEventListener('click', function() {
    this.classList.toggle('clicked');
});


const progress = document.getElementById('progress');

window.addEventListener('scroll', e => {
    let sY = window.scrollY,
        height = document.body.scrollHeight - window.screen.availHeight,
        val = 100 * (sY / height);

    progress.style.width = Math.min(Math.max(val, 0), 100) + '%';
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('scripts/sw.js').then(function(registration) {

            console.log('Registrated service worker: ', registration.scope);

        }, function(err) {

            console.log('Failed to register service worker: ', err);
        });
    });
}

particlesJS('header', {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 500
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 3,
                "size_min": 0.8,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 0,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "top",
            "random": true,
            "straight": true,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 0,
                "rotateY": 0
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "size": 3,
                "duration": 5,
                "opacity": 8,
                "speed": 3
            }
        }
    },
    "retina_detect": true
});