import Singelton from "../scripts/storage/storage";
import {INITIAL, KEYS} from "../scripts/constants";

// Mock the Chrome API
const mockChrome = {
    runtime: {
        lastError: null,
    },
    storage: {
        sync: {
            get: () => jest.fn(() => ({...INITIAL}))
        }
    },
};
// error TS2740: Type '{ runtime: { lastError: null; }; storage: { sync: { get: () => Mock<{ stopWords: string[]; stopYears: Years; colors: Colors; removeWords: string[]; selectors: Selectors; }, [], any>; }; }; }' is missing the following properties from type 'typeof chrome': cast, accessibilityFeatures, action, alarms, and 60 more.
global.chrome = mockChrome;

describe.skip("Store", () => {

    it("should be a singleton", () => {
        const store1 = Singelton;
        const store2 = Singelton;
        expect(store1).toBe(store2);
    });

    it("should initialize data from Chrome storage", () => {
        const store = Singelton;
        const data = store.getData();
        expect(data[KEYS.HIGHLIGHT_YEARS]).toEqual(INITIAL[KEYS.HIGHLIGHT_YEARS]);
    })
})