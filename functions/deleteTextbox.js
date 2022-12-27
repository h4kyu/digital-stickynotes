// deletes textbox from document and removes from storage
function deleteTextbox(container, url) {
    let textareaID = container.firstChild.id;
    browser.storage.local.get(url).then(
            function(val) {
                // iterate over array of box attributes to find box with boxID
                for (let i = 0; i < val[url].length; i++) {
                    // check for box with ID
                    if (val[url][i][0] === textareaID) {
                        // remove box attributes array of box with ID
                        val[url].splice(i, 1);
                        let setVars = {};
                        setVars[url] = val[url];
                        browser.storage.local.set(setVars);
                        break;
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
    );
    // remove from document
    container.remove();
}