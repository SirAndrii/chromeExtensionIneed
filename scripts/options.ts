import {KEYS} from "./constants";
import {StorageData} from "./types";

const {HIGHLIGHT_WORDS, REMOVE_WORDS, COLORS, SELECTORS, HIGHLIGHT_YEARS} = KEYS

const highlightTextField = document.getElementById('stop-words') as HTMLInputElement;
const removeTextField = document.getElementById('remove-words') as HTMLInputElement;
const highlightYearsInput = document.getElementById('highlight-years-input') as HTMLInputElement;
const highlightYearsCheckbox = document.getElementById('highlight-years') as HTMLInputElement;

const highlightColorInput = document.getElementById('highlight-color') as HTMLInputElement;
const backgroundColorInput = document.getElementById('background-color') as HTMLInputElement;

const scrollableContainerInput = document.getElementById('scrollable-container') as HTMLInputElement;
const skeletonClassInput = document.getElementById('skeleton-class') as HTMLInputElement
const removeTestIdInput = document.getElementById('remove-test-id') as HTMLInputElement

const saveButton = document.getElementById('save-button')! as HTMLInputElement
chrome.storage.sync.get(Object(KEYS).keys, (result) => {
    highlightTextField.value = result[HIGHLIGHT_WORDS].join(', ');
    highlightYearsInput.value = result[HIGHLIGHT_YEARS].years;
    highlightYearsCheckbox.checked = result[HIGHLIGHT_YEARS].show;
    removeTextField.value = result[REMOVE_WORDS].join(', ');
    highlightColorInput.value = result[COLORS].highlightColor;
    backgroundColorInput.value = result[COLORS].backgroundColor;
    scrollableContainerInput.value = result[SELECTORS].SCROLLABLE_CONTAINER
    skeletonClassInput.value = result[SELECTORS].SKELETON_CLASS
    removeTestIdInput.value = result[SELECTORS].REMOVE_TEST_ID

    updateHighlightYearsInput()
});

function updateHighlightYearsInput() {
    if (highlightYearsCheckbox.checked) {
        highlightYearsInput.disabled = false;
    } else {
        highlightYearsInput.disabled = true;
    }
}

highlightYearsCheckbox.addEventListener('change', updateHighlightYearsInput);

// Save options to storage
saveButton.addEventListener('click', function () {
    const dataToStorage: StorageData = {
        [HIGHLIGHT_WORDS]: highlightTextField.value.split(',').map(s => s.trim()),
        [HIGHLIGHT_YEARS]: {
            show: highlightYearsCheckbox.checked,
            years: validNumber(highlightYearsInput.value)
        },
        [REMOVE_WORDS]: removeTextField.value.split(',').map(s => s.trim()),
        [COLORS]: {
            backgroundColor: backgroundColorInput.value,
            highlightColor: highlightColorInput.value,
        },
        [SELECTORS]: {
            SKELETON_CLASS: skeletonClassInput.value,
            SCROLLABLE_CONTAINER: scrollableContainerInput.value,
            REMOVE_TEST_ID: removeTestIdInput.value
        }
    }

    chrome.storage.sync.set(dataToStorage, () => {
        alert('Options saved')
    })
});

/* Just Toggle button. Didn't want to create a new entry point */
const toggleButton = document.querySelector('.selectors-toggle') as HTMLElement;
const toggleText = toggleButton.querySelector('.selectors-toggle-text') as HTMLElement;
const toggleIcon = toggleButton.querySelector('.selectors-toggle-icon') as HTMLElement;
const selectorsContent = document.querySelector('.selectors-content') as HTMLElement;

toggleButton.addEventListener('click', () => {
    if (selectorsContent.style.display === 'none') {
        selectorsContent.style.display = 'block';
        toggleText.textContent = 'Hide selectors';
        toggleIcon.style.transform = 'rotate(180deg)';
    } else {
        selectorsContent.style.display = 'none';
        toggleText.textContent = 'Show selectors';
        toggleIcon.style.transform = 'rotate(0deg)';
    }
});

function validNumber(numInput:string): string {
    if (numInput.trim()==="") return '0'

    let num = parseInt(numInput)
    if(num <= 0){
        return '0'
    }

    return num.toString()
}