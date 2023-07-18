
const progress = document.getElementById('progress');
const titles = document.getElementById('titles');
const content = document.querySelector('div.main');

window.addEventListener('scroll', () => {
    let sY = window.scrollY,
        height = document.body.scrollHeight - window.screen.availHeight,
        val = 100 * (sY / height);

    progress.style.width = Math.min(Math.max(val, 0), 100) + '%';


    titles.style.opacity = Math.max(1 - window.scrollY / window.innerHeight, 0)
    content.style.color = `rgba(0, 0, 0, ${Math.max(window.scrollY / window.innerHeight, 0)})`;
});

