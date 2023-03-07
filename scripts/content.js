const targetElementClass = 'jobsearch-JobComponent';
const mountedComponentID = 'jobsearch-ViewjobPaneWrapper'
const skeletonClass = 'jobsearch-ViewJobSkeleton'


chrome.storage.sync.get(['stopWords', 'colors'], (result) => {
    // Check if the storage is empty
    if (Object.keys(result).length === 0) {

        const initialData = {
            stopWords: ['secret', 'clearance', 'software'],
            colors: {
                highlightColor: 'yellow',
                backgroundColor: 'grey'
            }
        };

        chrome.storage.sync.set(initialData, () => {
            console.log('Initial data has been set to storage.');
        })
    }
})
const highlightAll = () => {
    const jobDescription = document.getElementsByClassName(targetElementClass)[0];
    chrome.storage.sync.get(['stopWords', 'colors'], (items) => {
            const stopWords = items.stopWords;
            const colors = items.colors;

            stopWords.forEach((word) => highlighter(word, jobDescription, colors))
        });


};

//todo use regex and do search for multi words in one walk.
function highlighter(word, elementTree, colors) {
    if (!(elementTree instanceof Node)) {
        return;
    }
    console.log('START SEARCHING')

    const walker = document.createTreeWalker(elementTree, NodeFilter.SHOW_TEXT);
    let node;
    let containWord = false;
    const regex = new RegExp(word, 'gi')

    while (node = walker.nextNode()) {
        // Check if the node's text content contains the word to highlight
        if (node.textContent.match(regex)) {
            // marker for change parent element
            containWord = true;
// Wrap the matched word with special symbols because Node doesn't have innerText
            node.textContent = node.textContent.replace(regex, `@@@${word}@@@`);
        }
    }


    if (containWord) {

        // Replace the special symbols with a HTML span element
        elementTree.innerHTML = elementTree.innerHTML.replace(/@@@(.*?)@@@/g, `<span style="background-color: ${colors.highlightColor}">$1</span>`);
        // Change the background of the first element
        elementTree.style.backgroundColor = colors.backgroundColor;
    }
}


const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            console.log('Changed');
            // check if the job title class were changed. Indeed changes this class often
            // const jobDescription = document.querySelector(mountedComponentClass);
            // if (jobDescription) {
            //     observer.disconnect();
            //     console.log('Job description found!');
            //     highlightAll();
            // }
            mutation.removedNodes.forEach(removedNode => {
                if (removedNode.nodeType === Node.ELEMENT_NODE && removedNode.classList.contains(skeletonClass)) {
                    console.log('Skeleton removed! Start processing');
                    highlightAll();
                }
            });
        }
    }
});

observer.observe(document, {childList: true, subtree: true});


