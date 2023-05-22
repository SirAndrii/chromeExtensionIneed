import { INITIAL, KEYS } from "../constants";
import { StorageData } from "../types";

class Store {
    private static instance: Store;
    private data: StorageData;

    private constructor() {
        this.data = { ...INITIAL };
        this.init();
    }

    static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    private init() {
        chrome.storage.sync.get(Object.keys(KEYS), (result) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                this.data = {
                    [KEYS.HIGHLIGHT_WORDS]: result[KEYS.HIGHLIGHT_WORDS],
                    [KEYS.HIGHLIGHT_YEARS]: result[KEYS.HIGHLIGHT_YEARS],
                    [KEYS.REMOVE_WORDS]: result[KEYS.REMOVE_WORDS],
                    [KEYS.COLORS]: result[KEYS.COLORS],
                    [KEYS.SELECTORS]: result[KEYS.SELECTORS],
                };
            }
        });
    }

    getData(): StorageData {
        return this.data;
    }
}
console.log(Store.getInstance())
export default Store.getInstance();