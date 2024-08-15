import Background from "./Background";
import Terminal from "./console/Terminal";

export default function App() {
    return (
        <>
            <div id="content" style={{height: "100%"}} className="center">
                <Terminal />
            </div>

            <Background />
        </>
    );
};