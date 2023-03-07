import {getChromeStorageData, saveChromeStorageData} from "./chomeStorage";

const stopWordsInput = document.getElementById('stop-words');
const highlightColorInput = document.getElementById('highlight-color');
const backgroundColorInput = document.getElementById('background-color');
const saveButton = document.getElementById('save-button');


(async function() {
    const result = await getChromeStorageData(['stopWords', 'colors']);

    stopWordsInput.value = result.stopWords.join(', ');
    highlightColorInput.value = result.colors.highlightColor;
    backgroundColorInput.value = result.colors.backgroundColor;
})();

// Save options to storage
saveButton.addEventListener('click', function () {

    const stopWords = stopWordsInput.value.split(',').map(s => s.trim());
    const backgroundColor = backgroundColorInput.value;
    const highlightColor = highlightColorInput.value;

    saveChromeStorageData({
        stopWords,
        colors: {
            highlightColor,
            backgroundColor
        }
    }, () => {
        alert('Options saved');
    });
});