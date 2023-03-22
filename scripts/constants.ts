import {StorageData} from "./types";

export const KEYS = {
    HIGHLIGHT_WORDS: 'stopWords',
    HIGHLIGHT_YEARS: 'stopYears',
    REMOVE_WORDS: 'removeWords',
    COLORS: 'colors',
    SELECTORS: 'selectors'
} as const;



export const INITIAL: StorageData = {
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
}
