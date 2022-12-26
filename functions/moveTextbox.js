// move textbox with ID of boxID
function moveTextbox(boxID, boxL, boxT) {
    let box = document.getElementById(boxID);
    // set textbox position to cursor position
    box.style.left = boxL + 'px';
    box.style.top = boxT + 'px';
    // update textbox location in storage
    const k = window.location.href;
    let got = browser.storage.local.get(k).then(
            function(val) {
                // iterate over array of box attributes to find box with boxID
                for (let i = 0; i < val[k].length; i++) {
                    // check for box with boxID
                    if (val[k][i][0] === boxID) {
                        // update top and left position
                        val[k][i][2] = document.getElementById(boxID).style.top;
                        val[k][i][3] = document.getElementById(boxID).style.left;
                        let setVars = {};
                        setVars[k] = val[k];
                        browser.storage.local.set(setVars);
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
            );
}
