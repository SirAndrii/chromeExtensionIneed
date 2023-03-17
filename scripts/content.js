const targetElementClass = 'jobsearch-JobComponent';
const skeletonClass = 'jobsearch-ViewJobSkeleton'
const testId = 'viewJob-skeleton'

let stopWords = [];
let colors = {};
chrome.storage.sync.get(['stopWords', 'colors'], (result) => {
    //initial options are in service_worker.js
        stopWords = result.stopWords
        colors = result.colors
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

const removeByTitle =()=>{
    const regex = /\b(senior|lead|architect|java|\.net|sr\.|manager|\.net)\b/gi;
    const titles = [...document.querySelectorAll('h2.jobTitle')]
    if (titles.length===0) return

    const titlesRemove = titles.filter( title => regex.test(title.textContent))
    if (titles.length===0) return

    titlesRemove.forEach((title) => {
        // Find the nearest parent li element and remove it from the DOM
        const listItem = title.closest('li');
        if (listItem) {
            listItem.remove();
        }
    });

}

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
                console.log(removedNode)
                if (removedNode.nodeType === Node.ELEMENT_NODE && (removedNode.classList.contains(skeletonClass) || removedNode.getAttribute('data-testid') === testId)) {
                    console.log('Skeleton removed!')
                    highlightAll()
                    removeByTitle()
                }
            });
        }
    }
});

observer.observe(document, {childList: true, subtree: true});


