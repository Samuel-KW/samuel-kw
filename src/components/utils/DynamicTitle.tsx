// Original page title
const originalTitle: string = document.title;

let loopingTitle: string = "",
    intervalId: number | undefined;

// Title animation function
function titleAnimation(): void {
    loopingTitle = loopingTitle.slice(1) + loopingTitle.charAt(0);
    document.title = loopingTitle;
}

// Event listener for visibility change
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        document.title = originalTitle;
        clearInterval(intervalId);
        intervalId = undefined;
    } else {
        loopingTitle = `${originalTitle} | `;
        intervalId = window.setInterval(titleAnimation, 1000);
    }
});