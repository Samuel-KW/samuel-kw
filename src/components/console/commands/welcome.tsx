import { Bold, Italic, Link, Underline, Highlight} from "./Utility";

export const adjectives = [ "snazzy", "stylish", "sleek", "innovative", "dynamic", "cutting-edge", "versatile", "professional", "sleek", "engaging", "creative" ];

export default function Welcome () {

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    return <div>
        <div> _____ _   ___    _ </div>
        <div>/  ___| | /   |  | |</div>
        <div>\ `--.| |/ /| |  | |</div>
        <div> `--.      \| |/\| |</div>
        <div>/\__/   |\  \  __  /</div>
        <div>\____/\_| \_/\/  \/ </div>
        <br />

        <div>Welcome to my <Italic>{adjective}</Italic> portfolio</div>
        <br />

        <div>Developed by <Bold>Samuel Walls</Bold></div>
        <br />

        <div>Want to see how it works? View the source code on my <Link href="https://github.com/samuel-kw">GitHub</Link></div>
        <div>To view available commands, type `<Highlight>help</Highlight>`</div>
        <br />
    </div>
}