let config = {
    muted: true,
    volume: 1,
    interaction: false
};

if (localStorage.getItem("muted")) config.muted = localStorage.getItem("muted") === "true";

const listenForInteraction = () => {
    config.interaction = true;

    document.body.removeEventListener("click", listenForInteraction);
};

document.body.addEventListener("click", listenForInteraction);

export default config;