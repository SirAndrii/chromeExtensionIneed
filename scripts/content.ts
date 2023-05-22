import {INITIAL, KEYS} from "./constants";
import {StorageData} from "./types";
import Singelton from './storage/storage'
import removeByTitle from "./utils/removeByTitle";
import highlightWords from "./utils/highlightWords";
import highlightYears from "./utils/highlightYears";


const {HIGHLIGHT_WORDS, HIGHLIGHT_YEARS, REMOVE_WORDS, COLORS, SELECTORS} = KEYS


const data: StorageData = Singelton.getData()

const highlightAll = () => {
    const jobDescription = document.getElementsByClassName(data[SELECTORS].SCROLLABLE_CONTAINER)[0] as HTMLElement|null
    if (!jobDescription) {
        console.error(`Selector can't find the proper div with a class: ${data[SELECTORS].SCROLLABLE_CONTAINER}. Please update selectors in the extension interface. Troubleshooting: https://github.com/SirAndrii/chromeExtensionIneed#troubleshooting ` )
        return
       }

    // Get the parent node of the root element
    const walker = document.createTreeWalker(jobDescription, NodeFilter.SHOW_TEXT)
    let node;

    while (node = walker.nextNode()) {
        if (node?.textContent) {
            node.textContent = highlightWords( node.textContent, data[HIGHLIGHT_WORDS],  data[COLORS].highlightColor)

            if(data[HIGHLIGHT_YEARS].show){
                node.textContent = highlightYears( node.textContent, Number(data[HIGHLIGHT_YEARS].years), data[COLORS].highlightColor)
            }
        }
    }
    //If found special markup (data-highlight) for highlighted text then convert HTML entities to tags
    const hasHighlight = /data-highlight="true"/.test(jobDescription.innerHTML);

    if (hasHighlight){
        jobDescription.innerHTML = jobDescription.innerHTML
            .replace(/(@@@lt;|@@@gt;)/g, (match) => match==='@@@lt;' ? '<' : '>')
            //.replace(/(\&lt;|\&gt;)/g, (match) => match==='\&lt;' ? '<' : '>')
        jobDescription.style.backgroundColor =  data[COLORS].backgroundColor

        scrollFirstHighlight(jobDescription)
    }
}
const scrollFirstHighlight = (rootElement: HTMLElement) => {
     const highlightedElement: HTMLElement | null = rootElement.querySelector('[data-highlight="true"]');//scrollableElement.querySelector(`span[style*="background-color: ${data[COLORS].highlightColor}"]`);

        if ( highlightedElement) {
            rootElement.scrollTop = highlightedElement.offsetTop - 260
        }
}

const observer = new MutationObserver((mutations) => {

    let selectorFound: Record<string, boolean> = {
        pagination: false,
        skeleton: false,
        removed: false
    };

    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(removedNode => {
                if (
                    removedNode.nodeType === Node.ELEMENT_NODE &&
                    ((removedNode as Element).classList.contains(data[SELECTORS].SKELETON_CLASS) ||
                        (removedNode as Element).getAttribute('data-testid') === data[SELECTORS].REMOVE_TEST_ID)
                ) {
                    selectorFound.skeleton = true
                    console.log('Skeleton was removed, trigger highlighter!');

                    //after update indeed's website started to manipulate with innerHTML, hotfix
                    if (!selectorFound.removed) {
                        removeByTitle(data[REMOVE_WORDS])
                        selectorFound.removed = true
                    }

                    setTimeout(() => highlightAll(), 100);
                }
            });
        }
    }

});

observer.observe(document, { childList: true, subtree: true });
