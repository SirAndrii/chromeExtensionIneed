/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./scripts/constants.ts
const KEYS = {
    HIGHLIGHT_WORDS: 'stopWords',
    HIGHLIGHT_YEARS: 'stopYears',
    REMOVE_WORDS: 'removeWords',
    COLORS: 'colors',
    SELECTORS: 'selectors'
};
const INITIAL = {
    [KEYS.SELECTORS]: {
        SCROLLABLE_CONTAINER: 'jobsearch-embeddedBody',
        SKELETON_CLASS: 'jobsearch-ViewJobSkeleton',
        REMOVE_TEST_ID: 'viewJob-skeleton',
    },
    [KEYS.HIGHLIGHT_YEARS]: {
        show: true,
        years: '3'
    },
    [KEYS.COLORS]: {
        highlightColor: '#f3d381',
        backgroundColor: '#b0b0b0'
    },
    [KEYS.REMOVE_WORDS]: ['senior', 'lead', 'architect', 'java', '\.net', 'sr\.', 'manager'],
    [KEYS.HIGHLIGHT_WORDS]: ['secret', 'clearance', 'citizen']
};

;// CONCATENATED MODULE: ./scripts/utils/backslashRegex.ts
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/**
 * backslash any special characters in a string and join them in regex OR pattern.
 *
 * @param {string[]} words - An array of words to escape and concatenate.
 * @returns {string}  - (word1|\.word2|word3).
 */
function backslashSpec(words) {
    return `(${words.map(word => escapeRegExp(word)).join('|')})`;
}

;// CONCATENATED MODULE: ./scripts/utils/removeByTitle.ts

const removeByTitle = (words) => {
    const removeWordsStr = backslashSpec(words);
    const regex = new RegExp(`\\b${removeWordsStr}\\b`, 'gi');
    //todo store selector in storage
    const titles = Array.from(document.querySelectorAll('h2.jobTitle'));
    if (titles.length === 0)
        return;
    const titlesRemove = titles.filter(title => regex.test(title.textContent));
    if (titlesRemove.length === 0)
        return;
    titlesRemove.forEach((title) => {
        // Find the nearest parent li element and remove it from the DOM
        const listItem = title.closest('li');
        if (listItem) {
            listItem.remove();
        }
    });
};
/* harmony default export */ const utils_removeByTitle = (removeByTitle);

;// CONCATENATED MODULE: ./scripts/utils/highlightWords.ts

/**

 Highlight specific words in a string with wrap them in HTML entity that represents span tags.
 @param {string} text - inputted text to be processed.
 @param {string[]} words - words to be highlighted .
 @param {string} [color='red'] - The background color.
 @returns {string} - example, some &lt;span style="..."&gt;word&lt.
 */
function highlightWords(text, words, color = 'red') {
    const regex = new RegExp(`${backslashSpec(words)}`, 'gi');
    const match = text.match(regex);
    if (match) {
        const matchWords = [...new Set(match)];
        if (matchWords.length > 0) {
            matchWords.forEach(match => {
                text = text.replace(match, `@@@lt;span data-highlight="true" style="background: ${color}"@@@gt;${match}@@@lt;/span@@@gt;`);
            });
        }
    }
    return text;
}

;// CONCATENATED MODULE: ./scripts/utils/highlightYears.ts
function highlightYears(text, num, color = 'red') {
    const regex = /\d+\+? years/gi;
    const match = text.match(regex);
    if (match) {
        const matchNum = [...new Set(match)].filter(item => parseInt(item) >= num);
        if (matchNum.length > 0) {
            matchNum.forEach(match => {
                text = text.replace(match, `@@@lt;span data-highlight="true" style="background: ${color}"@@@gt;${match}@@@lt;/span@@@gt;`);
            });
        }
    }
    return text;
}

;// CONCATENATED MODULE: ./scripts/content.ts




const { HIGHLIGHT_WORDS, HIGHLIGHT_YEARS, REMOVE_WORDS, COLORS, SELECTORS } = KEYS;
const data = Object.assign({}, INITIAL);
chrome.storage.sync.get(Object(KEYS).keys, (result) => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    }
    else {
        data[HIGHLIGHT_WORDS] = result[HIGHLIGHT_WORDS];
        data[HIGHLIGHT_YEARS] = result[HIGHLIGHT_YEARS];
        data[REMOVE_WORDS] = result[REMOVE_WORDS];
        data[COLORS] = result[COLORS];
        data[SELECTORS] = result[SELECTORS];
    }
});
const highlightAll = () => {
    const jobDescription = document.getElementsByClassName(data[SELECTORS].SCROLLABLE_CONTAINER)[0];
    if (!jobDescription) {
        console.error(`Selector can't find the proper div with a class: ${data[SELECTORS].SCROLLABLE_CONTAINER}. Please update selectors in the extension interface. Troubleshooting: https://github.com/SirAndrii/chromeExtensionIneed#troubleshooting `);
        return;
    }
    // Get the parent node of the root element
    const walker = document.createTreeWalker(jobDescription, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
        if (node === null || node === void 0 ? void 0 : node.textContent) {
            node.textContent = highlightWords(node.textContent, data[HIGHLIGHT_WORDS], data[COLORS].highlightColor);
            if (data[HIGHLIGHT_YEARS].show) {
                node.textContent = highlightYears(node.textContent, Number(data[HIGHLIGHT_YEARS].years), data[COLORS].highlightColor);
            }
        }
    }
    //If found special markup (data-highlight) for highlighted text then convert HTML entities to tags
    const hasHighlight = /data-highlight="true"/.test(jobDescription.innerHTML);
    if (hasHighlight) {
        jobDescription.innerHTML = jobDescription.innerHTML
            .replace(/(@@@lt;|@@@gt;)/g, (match) => match === '@@@lt;' ? '<' : '>');
        //.replace(/(\&lt;|\&gt;)/g, (match) => match==='\&lt;' ? '<' : '>')
        jobDescription.style.backgroundColor = data[COLORS].backgroundColor;
        scrollFirstHighlight(jobDescription);
    }
};
const scrollFirstHighlight = (rootElement) => {
    const highlightedElement = rootElement.querySelector('[data-highlight="true"]'); //scrollableElement.querySelector(`span[style*="background-color: ${data[COLORS].highlightColor}"]`);
    if (highlightedElement) {
        rootElement.scrollTop = highlightedElement.offsetTop - 260;
    }
};
const observer = new MutationObserver((mutations) => {
    let selectorFound = {
        pagination: false,
        skeleton: false,
        removed: false
    };
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(removedNode => {
                if (removedNode.nodeType === Node.ELEMENT_NODE &&
                    (removedNode.classList.contains(data[SELECTORS].SKELETON_CLASS) ||
                        removedNode.getAttribute('data-testid') === data[SELECTORS].REMOVE_TEST_ID)) {
                    selectorFound.skeleton = true;
                    console.log('Skeleton was removed, trigger highlighter!');
                    //after update indeed's website started to manipulate with innerHTML, hotfix
                    if (!selectorFound.removed) {
                        utils_removeByTitle(data[REMOVE_WORDS]);
                        selectorFound.removed = true;
                    }
                    setTimeout(() => highlightAll(), 100);
                }
            });
        }
    }
});
observer.observe(document, { childList: true, subtree: true });

/******/ })()
;