const targetElementClass = 'jobsearch-JobComponent';
const mountedComponentID = 'jobsearch-ViewjobPaneWrapper'
const skeletonClass = 'jobsearch-ViewJobSkeleton'

const stopWords = ['secret', 'clearance', 'software']
//look to the
// `document.querySelector` may return null if the selector doesn't match anything.

const highlightAll = () => {

    const jobDescription = document.getElementsByClassName(targetElementClass)[0];
    console.log({jobDescription, instance: jobDescription instanceof Node});
    stopWords.forEach((word) => highlighter(word, jobDescription))
};

//todo use regex and do search for multi words in one walk.
function highlighter(word, elementTree) {
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
        elementTree.innerHTML = elementTree.innerHTML.replace(/@@@(.*?)@@@/g, '<span style="background-color:yellow">$1</span>');
        // Change the background of the first element
        elementTree.style.backgroundColor = 'grey';
    }
}


const observer = new MutationObserver((mutations) => {
    for( let mutation of mutations) {
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


