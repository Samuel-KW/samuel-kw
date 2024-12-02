import Background from "./Background";
import Terminal from "./console/Terminal";
import AudioButton from "./Audio";

import "./utils/DynamicTitle";

const words = ['5+ years using python', 'ui/ux design', 'software development', '2d/3d graphic design', '7+ years using JavaScript', 'computer science major', 'professional website design'];

export default function App() {
    return (
        <>

            <AudioButton />

            <div id="content" style={{height: "100%"}} className="center">
                <Terminal />
            </div>

            <Background />
        </>
    );
};