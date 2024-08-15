import "./variables.css";
import Background from "./Background";

export default function App() {
    return (
        <>
            <div id="content" className="center">

                <div className="terminal">
                    <div className="terminal-bar">
                        <span className="terminal-header">Portfolio - Samuel Walls</span>
                        <span className="terminal-controls">
                            <span className="terminal-control-btn terminal-close"></span>
                            <span className="terminal-control-btn terminal-minimize"></span>
                            <span className="terminal-control-btn terminal-expand"></span>
                        </span>
                    </div>

                    <div className="terminal-body">
                        <div className="terminal-body-content">
                            {/* <ascii-img src="../images/day 3.webp" width="1920" height="1080" scale=".25" color="#ffffff" alt="Cinematic picture of a field of dandylions against a snow-capped mountain range."></ascii-img> */}
                        </div>
                    </div>
                </div>
            </div>

            <Background />
        </>
    );
};