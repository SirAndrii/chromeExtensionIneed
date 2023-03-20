import {INITIAL, KEYS} from "./constants";
import {Colors, StorageData} from "./types";
import removeByTitle from "./utils/removeByTitle";
//import * as events from "events";

const {HIGHLIGHT_WORDS, REMOVE_WORDS, COLORS, SELECTORS} = KEYS

// const targetElementClass = 'jobsearch-JobComponent';
// const skeletonClass = 'jobsearch-ViewJobSkeleton'
// const testId = 'viewJob-skeleton'

const data: StorageData = {...INITIAL}
chrome.storage.sync.get([HIGHLIGHT_WORDS, REMOVE_WORDS, COLORS, SELECTORS], (result) => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError)
    } else {
        //todo add type
        console.log(result)
        //initial options are in service_worker.ts
        data[HIGHLIGHT_WORDS] = result[HIGHLIGHT_WORDS]
        data[REMOVE_WORDS] = result[REMOVE_WORDS]
        data[COLORS] = result[COLORS]
        data[SELECTORS] = result[SELECTORS]
    }
});

const highlightAll = () => {
    const jobDescription = document.getElementsByClassName(data[SELECTORS].SCROLLABLE_CONTAINER)[0] as HTMLElement|null
    if (!jobDescription) return

    if (Array.isArray(data[HIGHLIGHT_WORDS])) {
        data[HIGHLIGHT_WORDS]?.forEach((word) => highlighter(word, jobDescription, data[COLORS]))
    }
    //scroll to first highlighted word

    //todo add to consts
    const scrollableElement: HTMLElement | null = jobDescription.querySelector('.jobsearch-JobComponent-embeddedBody');
    if (scrollableElement) {
        const highlightedElement: HTMLElement | null = scrollableElement.querySelector(`span[style*="background-color: ${data[COLORS].highlightColor}"]`);

        if ( highlightedElement) {
            scrollableElement.scrollTop = highlightedElement.offsetTop - 260
        }
    }else{
        console.error(`check selector '.jobsearch-JobComponent-embeddedBody'`)
    }


};


//todo use regex and do search for multi words in one walk.
function highlighter(word: string, elementTree: HTMLElement, colors: Colors) {
    if (!(elementTree instanceof Node)) {
        return
    }

    const walker = document.createTreeWalker(elementTree, NodeFilter.SHOW_TEXT)
    let node
    let containWord = false
    const regex = new RegExp(word, 'gi')

    while (node = walker.nextNode()) {
        // Check if the node's text content contains the word to highlight
        if (node?.textContent && node.textContent.match(regex)) {
            // marker for change parent element
            containWord = true
            // Wrap the matched word with special symbols because Node doesn't have innerText
            node.textContent = node.textContent.replace(regex, `@@@${word}@@@`)
        }
    }

    if (containWord) {
        // Replace the special symbols with a HTML span element
        elementTree.innerHTML = elementTree.innerHTML.replace(/@@@(.*?)@@@/g, `<span style="background-color: ${colors.highlightColor}">$1</span>`)
        // Change the background of the root element
        elementTree.style.backgroundColor = colors.backgroundColor
    }
}


const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(removedNode => {
                console.log(removedNode)
                if (removedNode.nodeType === Node.ELEMENT_NODE && ((removedNode as Element).classList.contains(data[SELECTORS].SKELETON_CLASS) || (removedNode as Element).getAttribute('data-testid') === data[SELECTORS].REMOVE_TEST_ID)) {
                    console.log('Skeleton removed!')
                    highlightAll()
                    removeByTitle(data[REMOVE_WORDS])
                }
            });
        }
    }
});

observer.observe(document, {childList: true, subtree: true});


