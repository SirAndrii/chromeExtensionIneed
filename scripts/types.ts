import {KEYS} from "./constants";
const {HIGHLIGHT_WORDS, REMOVE_WORDS, COLORS, SELECTORS} = KEYS

export interface StorageData {
    [HIGHLIGHT_WORDS]: string[];
    [COLORS]: Colors;
    [REMOVE_WORDS]: string[];
    [SELECTORS]: Selectors;
}

export interface Colors {
    highlightColor: string;
    backgroundColor: string;
}

export interface Selectors {
    SCROLLABLE_CONTAINER: string;
    SKELETON_CLASS: string;
    REMOVE_TEST_ID: string;
}
