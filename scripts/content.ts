import {INITIAL, KEYS} from "./constants";
import {StorageData} from "./types";
import removeByTitle from "./utils/removeByTitle";

import highlightWords from "./utils/highlightWords";
import highlightYears from "./utils/highlightYears";
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

    // Get the parent node of the root element
    const walker = document.createTreeWalker(jobDescription, NodeFilter.SHOW_TEXT)
    let node;

    while (node = walker.nextNode()) {
        if (node?.textContent) {
            node.textContent = highlightWords( node.textContent, data[HIGHLIGHT_WORDS],  data[COLORS].highlightColor)
            node.textContent = highlightYears( node.textContent, 3, data[COLORS].highlightColor)
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
const scrollFirstHighlight = (rootElement: HTMLElement)=> {
    //todo add to constants, test if we can do it without scrollableElement
    const scrollableElement: HTMLElement | null = rootElement.querySelector('.jobsearch-JobComponent-embeddedBody');
    if (scrollableElement) {
        const highlightedElement: HTMLElement | null = document.querySelector('[data-highlight="true"]');//scrollableElement.querySelector(`span[style*="background-color: ${data[COLORS].highlightColor}"]`);

        if ( highlightedElement) {
            scrollableElement.scrollTop = highlightedElement.offsetTop - 260
        }
    }else{
        console.error(`check selector '.jobsearch-JobComponent-embeddedBody'`)
    }
}

const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(removedNode => {

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


