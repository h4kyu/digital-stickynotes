// TODO expose public functions more privately
//dse_updateStorage = (function () {
//    function updateStorage(textbox, index, url) {
//    }
//
//    return {
//        updateStorage:  updateStorage,
//        foo: foo
//    };
//})();

/* saves to local storage, format of
{url: [[id, value, [topPos, leftPos], [highlightTopPos, highlightLeftPos, highlightHeight, highlightWidth]], []...], url: [[], []...]...}
*/

// TODO use enum https://www.sohamkamani.com/javascript/enums/#defining-enums-as-object-keys
const UPDATE_VALUE = 1;
const UPDATE_POSITION = 2;

function updateStorage(textbox, fieldToUpdate, url) {
    browser.storage.local.get(url).then(
            function(val) {
                // find box with id
                for (let i = 0; i < val[url].length; i++) {
                    let box = val[url][i];
                    if (box[0] === textbox.id) { // check for box with id
                        // update storage
                        if (fieldToUpdate === UPDATE_VALUE) { // updating value
                            box[fieldToUpdate] = textbox.textarea.value;
                        } else if (fieldToUpdate === UPDATE_POSITION) { // updating position
                            box[fieldToUpdate][0] = textbox.container.style.top;
                            box[fieldToUpdate][1] = textbox.container.style.left;
                        } else if (fieldToUpdate === 3) { // updating associated highlight
                            box[fieldToUpdate][0] = textbox.associatedHighlight.style.top;
                            box[fieldToUpdate][1] = textbox.associatedHighlight.style.left;
                            box[fieldToUpdate][2] = textbox.associatedHighlight.style.height;
                            box[fieldToUpdate][3] = textbox.associatedHighlight.style.width;
                        }
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