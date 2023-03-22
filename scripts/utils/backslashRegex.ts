export function escapeRegExp(str: string ):string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * backslash any special characters in a string and join them in regex OR pattern.
 *
 * @param {string[]} words - An array of words to escape and concatenate.
 * @returns {string}  - (word1|\.word2|word3).
 */
export function backslashSpec(words:string[]): string {
    return  `(${words.map(word => escapeRegExp(word)).join('|')})`
}