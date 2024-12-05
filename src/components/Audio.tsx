import { zzfx } from "./utils/ZzFX";
import config from "../config";
import { useEffect, useState } from "react";

function wrapper (data: (number | undefined)[]) {
    return () => {
        
        if (config.muted || !config.interaction) return;

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

export default function AudioButton () {

    const [muted, setMuted] = useState(config.muted);

    const toggle = () => {
        setMuted(!muted);
        localStorage.setItem("muted", String(!muted));
    };

    return (
        <div style={{cursor: "pointer", width: "32px", height: "32px", position: "fixed", right: "10px", top: "10px"}} 
              onClick={() => toggle()}>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 75 75"
                stroke="#fff" fill="#fff" strokeWidth="5" opacity={ muted ? 0.3 : 0.6 }>

                <path d="m39,14-17,15H6V48H22l17,15z" strokeLinejoin="round"/>

                <path id="muted" display={ muted ? "block" : "none" } d="m49,26 20,24m0-24-20,24" fill="none" strokeLinecap="round"/>
            </svg>
        </div>
        
    );
}