// loads all textbox objects previously stored for this url
function loadTextboxes() {
    // get attributes of stored boxes
    let key = window.location.href;
    let got = browser.storage.local.get(key).then(
            function(val) {
                if (Object.keys(val).length !== 0) {
                    // iterate over textbox arrays
                    for (let i = 0; i < val[key].length; i++) {
                        let boxAttributes = val[key][i];
                        // setup box object
                        let box = document.createElement("textarea");
                        box.type = "text";
                        box.id = boxAttributes[0];
                        // set box size
                        box.style.resize = 'none';
                        box.style.height = '150px';
                        box.style.width = '170px';
                        box.style.fontSize = '13px';

                        // set its previous text
                        box.value = boxAttributes[1]

                        // keep the url that box is on
                        box.url = window.location.href;

                        // add to page
                        document.body.appendChild(box);

                        // set position of box
                        box.style.position = 'absolute';
                        box.style.top = boxAttributes[2];
                        box.style.left = boxAttributes[3];
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
    );
}