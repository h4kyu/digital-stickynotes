// loads all textbox objects previously stored for this url
function loadTextboxes(url) {
    // get attributes of stored boxes
    let key = url;
    browser.storage.local.get(key).then(
            function(val) {
                if (Object.keys(val).length !== 0) {
                    // iterate over textbox arrays
                    for (let i = 0; i < val[key].length; i++) {
                        let boxAttributes = val[key][i];
                        // setup box container
                        let container = document.createElement("div");

                        // setup box object
                        let box = document.createElement("textarea");
                        box.type = "text";
                        box.id = boxAttributes[0];
                        box.new = false;
                        textboxToBackground(box);

                        // set its previous text
                        box.value = boxAttributes[1]

                        // keep the url that box is on
                        box.url = window.location.href;

                        // create button
                        let delButton = document.createElement("BUTTON");

                        // add elements together
                        initializeTextbox(container, box, delButton);

                        // add to page
                        document.body.appendChild(container);
                        container.style.zIndex = 1000;

                        // set position of container
                        container.style.top = boxAttributes[2];
                        container.style.left = boxAttributes[3];
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
    );
}