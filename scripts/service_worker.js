chrome.runtime.onInstalled.addListener(() => {
    //saving default data on install or update
    chrome.storage.sync.get(['stopWords', 'colors'], (result) => {
        if (Object.keys(result).length === 0) {
            //save initial options on first run
            const initialData = {
                stopWords: ['secret', 'clearance', 'citizen'],
                colors: {
                    highlightColor: '#f3d381',
                    backgroundColor: '#b0b0b0'
                }
            }

            chrome.storage.sync.set(initialData, () => {
                console.log('Initial data has been set to storage.')
            })
        }
    })

});