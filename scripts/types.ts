import {KEYS} from "./constants";

const {HIGHLIGHT_WORDS, HIGHLIGHT_YEARS, REMOVE_WORDS, COLORS, SELECTORS} = KEYS

export interface StorageData {
    [HIGHLIGHT_WORDS]: string[];
    [HIGHLIGHT_YEARS]: Years;
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

export interface Years {
    show: boolean;
    years: string;
}