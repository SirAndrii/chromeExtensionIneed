import backslashSpec from "./escapeRegex";

const removeByTitle = (words: string[]) => {
    const removeWordsStr = backslashSpec (words)
    const regex = new RegExp(`\\b(${removeWordsStr})\\b`, 'gi');
    //todo store selector in storage
    const titles: Element[] = Array.from(document.querySelectorAll('h2.jobTitle'))
    if (titles.length === 0) return

    const titlesRemove = titles.filter(title => regex.test(title.textContent!))
    if (titlesRemove.length === 0) return

    titlesRemove.forEach((title) => {
        // Find the nearest parent li element and remove it from the DOM
        const listItem = title.closest('li');
        if (listItem) {
            listItem.remove();
        }
    });
}

export default removeByTitle