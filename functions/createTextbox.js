// creates a textbox
function createTextbox(id, posX, posY, url) {
    // setup box container
    let container = document.createElement("div");
    container.id = id;

    // setup textarea object
    let textarea = document.createElement("textarea");
    textarea.type = "text";
    textarea.id = id;
    textarea.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.style.boxSizing = 'border-box';

    // TEST
    textarea.addEventListener('input', function (event) {
        let textarea = event.target;
        let container = textarea.parentElement;
        // let offset = textarea.offsetHeight - textarea.clientHeight;
        // let span = document.createElement('span');
        // document.body.appendChild(span);
        // span.style.fontFamily = 'Verdana, sans-serif';
        // span.style.fontSize = '13px';
        // span.style.height = 'auto';
        // span.style.width = 'auto';
        // span.style.position = 'absolute';
        // span.style.whiteSpace = 'pre-wrap';
        // span.innerHTML = event.target.value;
        // if (136 < span.clientWidth + 45 && span.clientWidth + 45 < 300) {
        //     event.target.style.width = span.clientWidth + 45 + 'px';
        // }
        // // console.log(span.clientHeight);
        // span.remove();

        // auto adjust textarea height
        container.style.height = 0;
        container.style.height = textarea.scrollHeight + 'px';

        // console.log(event.target.scrollHeight);
        // event.target.style.height = event.target.scrollHeight + 'px';

        /* MAYBE
        let span4Height = document.createElement('span');
        document.body.appendChild(span4Height);
        span4Height.style.fontFamily = 'Verdana, sans-serif';
        span4Height.style.fontSize = '13px';
        span4Height.style.height = 'auto';
        span4Height.style.width = parseInt(event.target.style.width) - 40 + 'px';
        span4Height.style.position = 'absolute';
        span4Height.style.whiteSpace = 'pre-line';
        span4Height.innerHTML = event.target.value;
        event.target.style.height = span4Height.clientHeight + 15 + 'px';
         */
    });

    // create delButton
    let delButton = document.createElement("BUTTON");
    delButton.id = id;
    delButton.name = 'delButton';

    // create associationButton
    let associationButton = document.createElement("BUTTON");
    associationButton.id = id;
    associationButton.name = 'associationButton';

    // create dropdownButton
    let dropdownButton = document.createElement('BUTTON');
    dropdownButton.id = id;
    dropdownButton.name = 'dropdownButton';
    const DROPPED = 1;
    const COLLAPSED = 0;
    dropdownButton.state = DROPPED;


    // setup textbox
    initializeTextbox(container, textarea, delButton, associationButton, dropdownButton, null);

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
        dropdownButton: dropdownButton,
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
