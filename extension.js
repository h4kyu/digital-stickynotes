// TODO remove running code from global scope
//(function () {
//    // …
//})();

const url = window.location.href;

let currentSelected = null;

let currentMouseOver = null;

let mouseDown = false;

let cursorX = 0;
let cursorY = 0;

/* object with all textboxes on current page, of the form
{id: {id: id,
      container: container,
      textarea: textarea,
      delButton: delButton,
      associationButton: associationButton,
      associatedHighlight: associatedHighlight,
      new: bool
      }} */
let textboxes = loadTextboxes(url); // load stored textboxes and update textboxes object

document.documentElement.addEventListener("keydown", (e) => { // clear local storage
    if (e.key === 'c') {
        browser.storage.local.clear();
    }
});

//document.getElementById("fff").addEventListener()

document.documentElement.addEventListener("click", (e) => { // handle click event
    if (e.target.nodeName === 'BUTTON') { // if button object is clicked
        let clickedButton = e.target;
        let textbox = textboxes[clickedButton.id];

        if (clickedButton.name === 'delButton') { // if button is delButton, delete textbox and remove from local storage
            deleteTextbox(textbox, url);
        }
        else if (clickedButton.name === 'associationButton') { // if button is associationButton
            // get first and last range of user selection
            let selection = window.getSelection();
            if (selection.rangeCount >= 1) {
                let firstRange = selection.getRangeAt(0);
                let lastRange = selection.getRangeAt(selection.rangeCount - 1);

                // bring textbox to foreground
                textboxToForeground(textbox);
                currentSelected = textbox;

                // create box around general area of user selection
                createAssociatedHighlight(textbox, firstRange, lastRange);

                // save associated highlight to local storage
                updateStorage(textbox, 3, url);

                selection.removeAllRanges();
            }
        }
    }
});

document.documentElement.addEventListener("mousemove", (e) => { // handle mousemove event
    // keep cursor position updated
    cursorX = e.clientX + window.pageXOffset;
    cursorY = e.clientY + window.pageYOffset;

    if (currentMouseOver !== null && mouseDown) { // move textbox
        let box = textboxes[currentMouseOver.id];
        let movementX = e.movementX;
        let movementY = e.movementY;
        moveTextbox(box, movementX, movementY, url);
    }
});


document.documentElement.addEventListener("mouseover", (e) => { // handle mouseover event
    // check if mouse is over a textbox
    if (e.target.type === "textarea") {
        currentMouseOver = e.target;
    } else {
        currentMouseOver = null;
    }
});

document.documentElement.addEventListener("mousedown", (e) => { // handle mousedown event
    mouseDown = true;

    // update new property of box
    let focusedElement = document.activeElement;
    if (focusedElement.type === 'textarea') {
        let box = textboxes[focusedElement.id];
        box.new = false;
    }

    // check if cursor is over a box
    if (currentMouseOver !== null) {
        let box = textboxes[currentMouseOver.id];

        // pull box from background
        textboxToForeground(box);

        // if currentSelected is empty
        if (currentSelected === null) {
            currentSelected = box;
        } else if (currentSelected !== box) {
            textboxToBackground(currentSelected);
            currentSelected = box;
        }
    } else {
        if (currentSelected !== null) {
            textboxToBackground(currentSelected);
            currentSelected = null;
        }
        if (focusedElement.type === 'textarea') {
            let box = textboxes[focusedElement.id];
            textboxToBackground(box);
        }
    }
});

document.documentElement.addEventListener("mouseup", (e) => { // handle mouseup event
    mouseDown = false;
});

document.documentElement.addEventListener("keydown", (e) => { // handle keydown event
    if (e.key.toLowerCase() === 'n' && e.ctrlKey && e.shiftKey) { // if Ctrl Shift N is pressed
        let id = crypto.randomUUID(); // unique id for box
        // newly created box to foreground
        if (currentSelected !== null) {
            textboxToBackground(currentSelected);
        }
        currentSelected = createTextbox(id, cursorX, cursorY, url);
        textboxes[id] = currentSelected;
        currentSelected.textarea.focus();
    }

    let focusedElement = document.activeElement;
    if (focusedElement.type === 'textarea') {
        let box = textboxes[focusedElement.id];
        if (e.key === 'Escape') {
            if (box.new) { // if textbox is new, delete it
                deleteTextbox(box, url);
            } else { // if textbox is not new, push it to background
                textboxToBackground(box);
            }
        } else if (e.key === 'Enter' && !e.shiftKey) {
            textboxToBackground(box);
            box.new = false;
        }
    } else if (currentSelected !== null) { // if no textarea is focused but a box is in foreground
        if (e.key === 'Escape' || e.key === 'Enter' && !e.shiftKey) {
            textboxToBackground(currentSelected);
            currentSelected = null;
        }
    }
});

document.addEventListener('input', (e) => { // handle input event
    if (e.target.name === 'uniqueName') { // update stored input of textarea when its value changes
        let box = textboxes[e.target.id];
        updateStorage(box, 1, url);
    }
})

// receive message from toolbar popup, then scroll to appropriate textbox position
browser.runtime.onMessage.addListener((request) => {
   window.scrollTo(0, request.scrollY - 200);
});

















