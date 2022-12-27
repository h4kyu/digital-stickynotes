// move textbox with ID of boxID
function moveTextbox(boxID, boxL, boxT, url) {
    let container = document.getElementById(boxID).parentNode;
    // set textbox position to cursor position
    container.style.left = boxL + 'px';
    container.style.top = boxT + 'px';
    // update textbox location in storage
    let got = browser.storage.local.get(url).then(
            function(val) {
                // iterate over array of box attributes to find box with boxID
                for (let i = 0; i < val[url].length; i++) {
                    // check for box with boxID
                    if (val[url][i][0] === boxID) {
                        // update top and left position
                        val[url][i][2] = container.style.top;
                        val[url][i][3] = container.style.left;
                        let setVars = {};
                        setVars[url] = val[url];
                        browser.storage.local.set(setVars);
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
            );
}
