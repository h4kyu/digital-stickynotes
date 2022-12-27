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
                        container.style.position = 'absolute';
                        container.style.resize = 'none';
                        container.style.height = '150px';
                        container.style.width = '170px';
                        // setup box object
                        let box = document.createElement("textarea");
                        box.type = "text";
                        box.id = boxAttributes[0];
                        box.new = false;
                        box.bged = true;
                        box.style.background = 'rgba(113,113,113, 0.5)';
                        box.style.color = 'rgba(113,113,113, 0.5)';
                        // set box size
                        box.style.resize = 'none';
                        box.style.fontSize = '13px';
                        box.style.fontFamily = "Comic Sans MS, cursive";

                        // set its previous text
                        box.value = boxAttributes[1]

                        // keep the url that box is on
                        box.url = window.location.href;

                        // add box to container
                        container.appendChild(box);
                        box.style.width = '100%';
                        box.style.height = '100%';
                        box.style.boxSizing = 'border-box';

                        // create button
                        let delButton = document.createElement("BUTTON");
                        let delButtonSymbol = document.createTextNode('x');
                        delButton.appendChild(delButtonSymbol);

                        // add button to container
                        container.appendChild(delButton);
                        delButton.style.position = 'absolute';
                        delButton.style.right = '0px';
                        delButton.style.top = '0px';

                        let leftPX = document.TxtBoxLeft + 'px';
                        let topPX = document.TxtBoxTop + 'px';
                        container.style.left = leftPX;
                        container.style.top = topPX;

                        // add to page
                        document.body.appendChild(container);

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