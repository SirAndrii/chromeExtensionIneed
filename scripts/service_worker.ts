import {KEYS, INITIAL} from "./constants";
import {StorageData} from "./types";
const {HIGHLIGHT_WORDS, REMOVE_WORDS, COLORS, SELECTORS} = KEYS
chrome.runtime.onInstalled.addListener(() => {
    //saving default data on install or update
    chrome.storage.sync.get([HIGHLIGHT_WORDS,COLORS], (result) => {
        if (Object.keys(result).length === 0) {
            //save initial options on first run
            const initialData: StorageData = {
                [HIGHLIGHT_WORDS]: INITIAL[HIGHLIGHT_WORDS],
                [REMOVE_WORDS]: INITIAL[REMOVE_WORDS],
                [COLORS]: INITIAL[COLORS],
                [SELECTORS]: INITIAL[SELECTORS]
            }

            chrome.storage.sync.set(initialData, () => {
                console.log('Initial data has been set to storage.')
            })
        }
    })
});