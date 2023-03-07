export function getChromeStorageData(keys) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(keys, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });
}

export function saveChromeStorageData(data, callback) {
    chrome.storage.sync.set(data, callback);
}