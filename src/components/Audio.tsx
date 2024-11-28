import { zzfx } from "./utils/ZzFX";
import config from "../config";
import { useState } from "react";

function wrapper (data: (number | undefined)[]) {
    return () => {
        
        if (config.muted) return;

        zzfx(...data);
    };
}

export const sound = {
    success: wrapper([1.1,,626,.01,.04,.2,,1.2,,,244,.1,.02,,,,,.79,.02,,792]), // TODO Update
    warning: wrapper([.4,,304,,,.02,,4.1,,,,,,,50,,,.71,.02,.04]),
    error: wrapper([5,,130,,.01,,,2.5,,,,,,,245,1.5,,,,,1]),
    type: wrapper([0.075,,1e3,,,.01,,,,,100,,,,60]),
    interact: wrapper([1,,227,,.03,.05,,,,-5,50,.03,.02,,,,,,,.19]),
    click: wrapper([0.5,,950,,,.009,,.5,,10,,,,,,,,.85]),
    disabled: wrapper([,,368,.01,.01,.02,,1.1,-20,-6,-206,.47,,,,,,.89,.03])
}

export default function Audio () {

    const [muted, setMuted] = useState(config.muted || !config.interaction);

    config.muted = muted;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0"
            viewBox="0 0 75 75" width="128" height="128"
            stroke="#fff" fill="#fff" stroke-width="5"
            onClick={() => setMuted(!muted)}>

            <path d="m39,14-17,15H6V48H22l17,15z" stroke-linejoin="round"/>

            <path id="muted" display={ muted ? "block" : "none" } d="m49,26 20,24m0-24-20,24" fill="none" stroke-linecap="round"/>
        </svg>
    );
}