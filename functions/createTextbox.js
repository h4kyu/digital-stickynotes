// creates a textbox
function createTextbox(id, posX, posY, url) {
    // setup box container
    let container = document.createElement("div");
    container.id = id;
    container.name = 'boxContainer';
    container.isMyBox = true;

    // setup textarea object
    let textarea = document.createElement("textarea");
    textarea.type = "text";
    textarea.id = id;
    textarea.name = 'textarea666';
    textarea.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.style.boxSizing = 'border-box';
    textarea.isMyBox = true;

    // TEST
    textarea.addEventListener('input', function (event) {
        let textarea = event.target;
        let container = textarea.parentElement;

        // auto adjust textarea height
        container.style.height = 0;
        container.style.height = textarea.scrollHeight + 25 +  'px';
        textarea.style.height = textarea.scrollHeight + 'px';
    });

    // create delButton
    let delButton = document.createElement("BUTTON");
    delButton.id = id;
    delButton.name = 'delButton';
    delButton.isMyBox = true;

    // create associationButton
    let associationButton = document.createElement("BUTTON");
    associationButton.id = id;
    associationButton.name = 'associationButton';
    associationButton.isMyBox = true;

    // create movementButton
    let movementDiv = document.createElement("div");
    movementDiv.id = id;
    movementDiv.name = 'movementDiv';
    movementDiv.draggable = true;
    movementDiv.isMyBox = true;

    // create copyButton
    let copyButton = document.createElement('button');
    copyButton.id = id;
    copyButton.name = 'copyButton';
    copyButton.isMyBox = true;

    // setup textbox
    initializeTextbox(container, textarea, delButton, associationButton, movementDiv, copyButton, null);

    // set container position
    container.style.left = posX + 'px';
    container.style.top = posY + 'px';

    // add to page
    document.body.appendChild(container);
    container.style.zIndex = 1000;

    let textbox = {id: id,
        container: container,
        textarea: textarea,
        delButton: delButton,
        associationButton: associationButton,
        movementDiv: movementDiv,
        copyButton: copyButton,
        associatedHighlight: null,
        new: true}

    // add box to local storage
    let textboxAttributes = [textbox.id,
                            textbox.textarea.value,
                            [textbox.container.style.top, textbox.container.style.left],
                            [null, null, null, null]]
    browser.storage.local.get(url).then(
            function(val) {
                // if no key value pairs exist
                if (Object.keys(val).length === 0) {
                    // set first key value pair
                    let setVars = {};
                    setVars[url] = [textboxAttributes];
                    browser.storage.local.set(setVars);
                } else { // otherwise add to existing array of values
                    val[url].push(textboxAttributes);
                    let setVars = {};
                    setVars[url] = val[url];
                    browser.storage.local.set(setVars);
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
            );

    return textbox;
}
