const stopWordsTextField = document.getElementById('stop-words');
const highlightColorInput = document.getElementById('highlight-color');
const backgroundColorInput = document.getElementById('background-color');
const saveButton = document.getElementById('save-button');
chrome.storage.sync.get(['stopWords', 'colors'], (result) => {
    stopWordsTextField.value = result.stopWords.join(', ');
    highlightColorInput.value = result.colors.highlightColor;
    backgroundColorInput.value = result.colors.backgroundColor;
});

// Save options to storage
saveButton.addEventListener('click', function () {

    const stopWords = stopWordsTextField.value.split(',').map(s => s.trim());
    const backgroundColor = backgroundColorInput.value;
    const highlightColor = highlightColorInput.value;

    chrome.storage.sync.set({
        stopWords,
        colors: {
            highlightColor,
            backgroundColor
        }
    }, () => {alert('Options saved')})
});