const title = document.title;

let loopingTitle, interval;

// Play animation when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        document.title = title;
        clearInterval(interval);
    } else {
        loopingTitle = document.title + " | ";
        interval = setInterval(titleAnimation, 1000);
    }
});

// Title animation
function titleAnimation () {
    let firstLetter = loopingTitle.charAt(0);
    let rest = loopingTitle.slice(1);

    loopingTitle = rest + firstLetter;
    document.title = loopingTitle;
}