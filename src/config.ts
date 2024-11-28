let config = {
    muted: true,
    volume: 1,
    interaction: false
}

const listenForInteraction = () => {
    config.interaction = true;

    document.body.removeEventListener("click", listenForInteraction);
};

document.body.addEventListener("click", listenForInteraction);

export default config;