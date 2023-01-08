// loads all textbox objects previously stored for this url
function loadTextboxes(url) {
    let key = url;
    let textboxes = {};
    browser.storage.local.get(key).then( // get attributes of stored boxes
            function(val) {
                if (Object.keys(val).length !== 0) {
                    for (let i = 0; i < val[key].length; i++) { // iterate over textbox arrays
                        let boxAttributes = val[key][i];
                        let id = boxAttributes[0];

                        // setup box container
                        let container = document.createElement("div");
                        container.id = id;

                        // setup box object
                        let textarea = document.createElement("textarea");
                        textarea.type = "text";
                        textarea.id = id;
                        textarea.name = 'uniqueName';
                        textarea.value = boxAttributes[1]; // set its previous text

                        // create delButton
                        let delButton = document.createElement("BUTTON");
                        delButton.id = id;
                        delButton.name = 'delButton';

                        // create associationButton
                        let associationButton = document.createElement("BUTTON");
                        associationButton.id = id;
                        associationButton.name = 'associationButton';

                        // setup associated highlight
                        let highlightBoxAttributes = boxAttributes[3];
                        let highlightBox = null;
                        if (highlightBoxAttributes[0] !== null) { // if associated highlight exists
                            highlightBox = document.createElement('div');
                            document.body.appendChild(highlightBox);
                            highlightBox.style.position = 'absolute';
                            highlightBox.style.zIndex = 999; // keep under textbox objects
                            highlightBox.style.backgroundColor = 'rgba(50, 85, 120, 0.25)';
                            highlightBox.style.left = highlightBoxAttributes[1];
                            highlightBox.style.top = highlightBoxAttributes[0];
                            highlightBox.style.height = highlightBoxAttributes[2];
                            highlightBox.style.width = highlightBoxAttributes[3];
                            highlightBox.style.borderRadius = '7px';
                        }

                        // add elements together
                        initializeTextbox(container, textarea, delButton, associationButton, null);

                        // add to page
                        document.body.appendChild(container);
                        container.style.zIndex = 1000;

                        // set position of container
                        container.style.top = boxAttributes[2][0];
                        container.style.left = boxAttributes[2][1];

                        let textbox = {id: id,
                            container: container,
                            textarea: textarea,
                            delButton: delButton,
                            associationButton: associationButton,
                            associatedHighlight: highlightBox,
                            new: false}

                        textboxes[id] = textbox;

                        textboxToBackground(textbox);
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
    );
    return textboxes;
}