// deletes textbox from document and removes from storage
function deleteTextbox(textbox, url) {
    let id = textbox.id;
    browser.storage.local.get(url).then(
            function(val) {
                // iterate over array of box attributes to find box with id
                for (let i = 0; i < val[url].length; i++) {
                    if (val[url][i][0] === id) { // remove box attributes array of box with id
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
    if (textbox.associatedHighlight !== null) {
        textbox.associatedHighlight.remove();
    }
    textbox.container.remove();
}