// creates a textbox
function createTextbox(boxID, url) {
    // setup box container
    let container = document.createElement("div");

    // setup box object
    let box = document.createElement("textarea");
    box.type = "text";
    box.id = boxID;
    box.new = true;
    box.bged = false;
    // keep the url that box is on
    box.url = window.location.href;
    box.style.backgroundColor = 'yellow';
    box.style.color = 'black';
    box.style.border = 'solid 1px orange';

    // create button
    let delButton = document.createElement("BUTTON");

    // put elements together
    initializeTextbox(container, box, delButton);

    // set container position
    let leftPX = document.TxtBoxLeft + 'px';
    let topPX = document.TxtBoxTop + 'px';
    container.style.left = leftPX;
    container.style.top = topPX;

    // add to page
    document.body.appendChild(container);
    container.style.zIndex = 1000;

    // add box to local storage
    let boxAttributes = [box.id, box.value, container.style.top, container.style.left];
    browser.storage.local.get(url).then(
            function(val) {
                // if no key value pairs exist
                if (Object.keys(val).length === 0) {
                    // set first key value pair
                    let setVars = {};
                    setVars[url] = [boxAttributes];
                    browser.storage.local.set(setVars);
                    // otherwise add to existing array of values
                } else {
                    val[url].push(boxAttributes);
                    let setVars = {};
                    setVars[url] = val[url];
                    browser.storage.local.set(setVars);
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
            );
}
