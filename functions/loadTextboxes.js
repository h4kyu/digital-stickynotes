// loads all textbox objects previously stored for this url
function loadTextboxes(val, url) {
    let key = url;
    let textboxes = {};
    if (Object.keys(val).length !== 0) {
        for (let i = 0; i < val[key].length; i++) { // iterate over textbox arrays
            let boxAttributes = val[key][i];
            let id = boxAttributes[0];

            // setup box container
            let container = document.createElement("div");
            container.id = id;
            container.name = 'boxContainer';
            container.isMyBox = true;

            // setup box object
            let textarea = document.createElement("textarea");
            textarea.type = "text";
            textarea.id = id;
            textarea.name = 'textarea666';
            textarea.value = boxAttributes[1]; // set its previous text
            textarea.isMyBox = true;

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

            textarea.addEventListener('input', function (event) {
                let textarea = event.target;
                let container = textarea.parentElement;

                // auto adjust textarea height
                container.style.height = 0;
                container.style.height = textarea.scrollHeight + 25 +  'px';
                textarea.style.height = textarea.scrollHeight + 'px';
            });

            // add elements together
            initializeTextbox(container, textarea, delButton, associationButton, movementDiv, copyButton, null);

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
                movementDiv: movementDiv,
                copyButton: copyButton,
                associatedHighlight: highlightBox,
                new: false}

            textboxes[id] = textbox;

            textboxToBackground(textbox);
        }
    }
    return textboxes;
}