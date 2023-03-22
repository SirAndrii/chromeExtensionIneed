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
        SCROLLABLE_CONTAINER: 'jobsearch-JobComponent',
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

;// CONCATENATED MODULE: ./scripts/service_worker.ts

const { HIGHLIGHT_WORDS, HIGHLIGHT_YEARS, REMOVE_WORDS, COLORS, SELECTORS } = KEYS;
chrome.runtime.onInstalled.addListener(() => {
    //saving default data on install or update
    chrome.storage.sync.get(Object(KEYS).keys, (result) => {
        if (Object.keys(result).length === 0) {
            //save initial options on first run
            const initialData = {
                [HIGHLIGHT_WORDS]: INITIAL[HIGHLIGHT_WORDS],
                [HIGHLIGHT_YEARS]: INITIAL[HIGHLIGHT_YEARS],
                [REMOVE_WORDS]: INITIAL[REMOVE_WORDS],
                [COLORS]: INITIAL[COLORS],
                [SELECTORS]: INITIAL[SELECTORS]
            };
            chrome.storage.sync.set(initialData, () => {
                console.log('Initial data has been set to storage.');
            });
        }
    });
});

/******/ })()
;