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
        SCROLLABLE_CONTAINER: 'jobsearch-JobComponent-embeddedBody',
        SKELETON_CLASS: 'jobsearch-ViewJobSkeleton',
        REMOVE_TEST_ID: 'viewJob-skeleton',
    },
    [KEYS.HIGHLIGHT_YEARS]: {
        show: true,
        years: '4'
    },
    [KEYS.COLORS]: {
        highlightColor: '#f3d381',
        backgroundColor: '#b0b0b0'
    },
    [KEYS.REMOVE_WORDS]: ['senior', 'lead', 'architect', 'java', '\.net', 'sr\.', 'manager'],
    [KEYS.HIGHLIGHT_WORDS]: ['secret', 'clearance', 'citizen']
};

;// CONCATENATED MODULE: ./scripts/options.ts

const { HIGHLIGHT_WORDS, REMOVE_WORDS, COLORS, SELECTORS, HIGHLIGHT_YEARS } = KEYS;
const highlightTextField = document.getElementById('stop-words');
const removeTextField = document.getElementById('remove-words');
const highlightYearsInput = document.getElementById('highlight-years-input');
const highlightYearsCheckbox = document.getElementById('highlight-years');
const highlightColorInput = document.getElementById('highlight-color');
const backgroundColorInput = document.getElementById('background-color');
const scrollableContainerInput = document.getElementById('scrollable-container');
const skeletonClassInput = document.getElementById('skeleton-class');
const removeTestIdInput = document.getElementById('remove-test-id');
const saveButton = document.getElementById('save-button');
chrome.storage.sync.get(Object(KEYS).keys, (result) => {
    highlightTextField.value = result[HIGHLIGHT_WORDS].join(', ');
    highlightYearsInput.value = result[HIGHLIGHT_YEARS].years;
    highlightYearsCheckbox.checked = result[HIGHLIGHT_YEARS].show;
    removeTextField.value = result[REMOVE_WORDS].join(', ');
    highlightColorInput.value = result[COLORS].highlightColor;
    backgroundColorInput.value = result[COLORS].backgroundColor;
    scrollableContainerInput.value = result[SELECTORS].SCROLLABLE_CONTAINER;
    skeletonClassInput.value = result[SELECTORS].SKELETON_CLASS;
    removeTestIdInput.value = result[SELECTORS].REMOVE_TEST_ID;
    updateHighlightYearsInput();
});
function updateHighlightYearsInput() {
    if (highlightYearsCheckbox.checked) {
        highlightYearsInput.disabled = false;
    }
    else {
        highlightYearsInput.disabled = true;
    }
}
highlightYearsCheckbox.addEventListener('change', updateHighlightYearsInput);
// Save options to storage
saveButton.addEventListener('click', function () {
    const dataToStorage = {
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
    };
    chrome.storage.sync.set(dataToStorage, () => {
        alert('Options saved');
    });
});
/* Just Toggle button. Didn't want to create a new entry point */
const toggleButton = document.querySelector('.selectors-toggle');
const toggleText = toggleButton.querySelector('.selectors-toggle-text');
const toggleIcon = toggleButton.querySelector('.selectors-toggle-icon');
const selectorsContent = document.querySelector('.selectors-content');
toggleButton.addEventListener('click', () => {
    if (selectorsContent.style.display === 'none') {
        selectorsContent.style.display = 'block';
        toggleText.textContent = 'Hide selectors';
        toggleIcon.style.transform = 'rotate(180deg)';
    }
    else {
        selectorsContent.style.display = 'none';
        toggleText.textContent = 'Show selectors';
        toggleIcon.style.transform = 'rotate(0deg)';
    }
});
function validNumber(numInput) {
    if (numInput.trim() === "")
        return '0';
    let num = parseInt(numInput);
    if (num <= 0) {
        return '0';
    }
    return num.toString();
}

/******/ })()
;