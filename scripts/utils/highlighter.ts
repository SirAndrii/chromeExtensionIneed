import highlightWords from "./highlightWords";
import {Colors} from "../types";

/**
 * Highlight words in the text content of an HTML element.
 *
 * @param {string[]} words - An array of words to highlight.
 * @param {HTMLElement} rootTree - The root element to search for text content.
 * @param {Colors} colors - The highlight colors to use.
 * @return {HTMLElement} rootCopy - highlighed clone of rootTree
 */
export default function highlighter(words: string[], rootTree: HTMLElement, colors: Colors) {
    //const jobDescription = document.getElementsByClassName(data[SELECTORS].SCROLLABLE_CONTAINER)[0] as HTMLElement|null
    if (!rootTree) return
    const rootCopy = rootTree.cloneNode(true) as HTMLElement;
    rootCopy.innerHTML = rootTree.innerHTML;

    const walker = document.createTreeWalker(rootCopy, NodeFilter.SHOW_TEXT)
    let node;

    while (node = walker.nextNode()) {
        if (node?.textContent) {
            node.textContent = highlightWords( node.textContent, words, colors.highlightColor)
        }
    }
    //If found special markup data-highlight for highlighted text then convert HTML entities to tags
    const regex = /data-highlight="true"/;
    const hasHighlight = regex.test(rootCopy.innerHTML);

    if (hasHighlight)
    {
        rootCopy.innerHTML = rootCopy.innerHTML
            .replace(/(@@@lt;|@@@gt;)/g, (match) => match==='@@@lt;' ? '<' : '>')

        rootCopy.style.backgroundColor = colors.backgroundColor
    }

    return rootCopy;
}