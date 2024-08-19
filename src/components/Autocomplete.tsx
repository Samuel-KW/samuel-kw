export default function autoComplete(input: string, phrases: string[]): string | null {
    
    // Convert the input to lowercase for case-insensitive comparison
    const lowerInput = input.toLowerCase();

    // Filter phrases that start with the user input
    const matches = phrases.filter(phrase => phrase.startsWith(lowerInput));

    // Sort matches by length, assuming shorter matches are more relevant
    matches.sort((a, b) => a.length - b.length);

    // Return the best match if any, otherwise null
    return matches[0] ?? null;
}