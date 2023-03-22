import {backslashSpec} from "./backslashRegex";

/**

 Highlight specific words in a string with wrap them in HTML entity that represents span tags.
 @param {string} text - inputted text to be processed.
 @param {string[]} words - words to be highlighted .
 @param {string} [color='red'] - The background color.
 @returns {string} - example, some &lt;span style="..."&gt;word&lt.
 */

export default function highlightWords(text: string, words: string[], color: string = 'red'): string {
    const regex = new RegExp(`${backslashSpec (words)}`, 'gi');
    const match: RegExpMatchArray | null = text.match(regex)

    if (match) {
        const matchWords = [...new Set(match)]

        if (matchWords.length > 0) {
            matchWords.forEach(match => {
                text = text.replace(match, `@@@lt;span data-highlight="true" style="background: ${color}"@@@gt;${match}@@@lt;/span@@@gt;`)
            })
        }
    }

    return text;
}
