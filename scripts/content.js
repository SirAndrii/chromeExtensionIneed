const targetElementClass = 'jobsearch-JobComponent';
const skeletonClass = 'jobsearch-ViewJobSkeleton'

let stopWords = [];
let colors = {};
chrome.storage.sync.get(['stopWords', 'colors'], (result) => {
    if (Object.keys(result).length === 0) {
        //save initial options on first run
        const initialData = {
            stopWords: ['secret', 'clearance', 'software'],
            colors: {
                highlightColor: 'yellow',
                backgroundColor: 'grey'
            }
        }

        chrome.storage.sync.set(initialData, () => {
            console.log('Initial data has been set to storage.')
        })
    } else {
        stopWords = result.stopWords
        colors = result.colors
    }
});

const highlightAll = () => {
    const jobDescription = document.getElementsByClassName(targetElementClass)[0]
    if (!jobDescription) return

    stopWords.forEach((word) => highlighter(word, jobDescription, colors))

    //scroll to first highlighted word
    const scrollableElement = jobDescription.querySelector('.jobsearch-JobComponent-embeddedBody');
    const highlightedElement = scrollableElement.querySelector(`span[style*="background-color: ${colors.highlightColor}"]`);

    if (scrollableElement && highlightedElement ) {
        scrollableElement.scrollTop = highlightedElement.offsetTop - 260
    }
};

//todo use regex and do search for multi words in one walk.
function highlighter(word, elementTree, colors) {
    if (!(elementTree instanceof Node)) {
        return
    }

    const walker = document.createTreeWalker(elementTree, NodeFilter.SHOW_TEXT)
    let node
    let containWord = false
    const regex = new RegExp(word, 'gi')

    while (node = walker.nextNode()) {
        // Check if the node's text content contains the word to highlight
        if (node.textContent.match(regex)) {
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
                if (removedNode.nodeType === Node.ELEMENT_NODE && removedNode.classList.contains(skeletonClass)) {
                    console.log('Skeleton removed!')
                    highlightAll()
                }
            });
        }
    }
});

observer.observe(document, {childList: true, subtree: true});


