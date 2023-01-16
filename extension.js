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

let currentInterval;

function main(textboxes) {
    for (const [key, value] of Object.entries(textboxes)) {
        value.textarea.addEventListener('mousedown', handleMousedown);
        value.textarea.addEventListener('mouseup', handleMouseup);
        value.textarea.addEventListener('click', handleClick);
        value.textarea.addEventListener('input', handleInput);
        value.delButton.addEventListener('click', handleDelPress);
        value.associationButton.addEventListener('click', handleAssociationPress);
        value.textarea.addEventListener('dragstart', drag_start, false);
    }

    document.documentElement.addEventListener("mousemove", (e) => { // handle mousemove event
        // keep cursor position updated
        cursorX = e.clientX + window.pageXOffset;
        cursorY = e.clientY + window.pageYOffset;
    });


    document.documentElement.addEventListener("mouseover", (e) => { // handle mouseover event
        // check if mouse is over a textbox
        if (e.target.type === "textarea") {
            currentMouseOver = textboxes[e.target.id];
        } else{
            currentMouseOver = null;
        }
    });

    document.documentElement.addEventListener("mousedown", function() { // handle mousedown event
        //    mouseDown = true;

        if (currentMouseOver === null) {
            // update new property of box
            let focusedElement = document.activeElement;
            if (focusedElement.type === 'textarea') {
                let box = textboxes[focusedElement.id];
                box.new = false;
                textboxToBackground(box);
            }
            if (currentSelected !== null) {
                textboxToBackground(currentSelected);
                currentSelected = null;
            }
        }
    });

    function handleMousedown(event) {
        mouseDown = true;

        let box = textboxes[event.target.id];

        // if currentSelected is empty
        if (currentSelected === null) {
            currentSelected = box;
        } else if (currentSelected !== box) {
            textboxToBackground(currentSelected);
            currentSelected = box;
        }

        box.textarea.blur();

        // box.textarea.onmousemove = handleDrag;
        // instead of above, use intervals for faster updating.

        // currentInterval = setInterval(moveTextbox, 10, box, movementX, movementY, url);
    }

    function handleMouseup(event) {
        mouseDown = false;
    }

    // make distinction between click and mousedown.
    // for click, do to foreground, for mousedown, just keep unselected. that would prevent highlighting.

    function handleDrag(event) {
        if (mouseDown) {
            console.log("DRAGGING");
            let box = textboxes[event.target.id];
            box.textarea.blur();
            // box.textarea.userSelect = 'none';
            let movementX = event.movementX;
            let movementY = event.movementY;
            moveTextbox(box, movementX, movementY, url);
        }
    }

    function handleInput(event) {
        let box = textboxes[event.target.id];
        updateStorage(box, 1, url);
    }

    function handleDelPress(event) {
        let box = textboxes[event.target.id];
        deleteTextbox(box, url);
    }

    function handleAssociationPress(event) {
        let box = textboxes[event.target.id];
        // get first and last range of user selection
        let selection = window.getSelection();
        if (selection.rangeCount >= 1) {
            let firstRange = selection.getRangeAt(0);
            let lastRange = selection.getRangeAt(selection.rangeCount - 1);

            // bring textbox to foreground
            textboxToForeground(box);
            currentSelected = box;

            // create box around general area of user selection
            createAssociatedHighlight(box, firstRange, lastRange);

            // save associated highlight to local storage
            updateStorage(box, 3, url);

            selection.removeAllRanges();
        }
    }

    function handleDropdownPress(event) {
        let dropdownButton = event.target;
        if (dropdownButton.state) { // state is 1 (DROPPED)
            console.log('a');
        } else { // state is 0 (COLLAPSED)
            console.log('b');
        }
    }

    function handleClick(event) {
        let box = textboxes[event.target.id];

        // pull box from background
        textboxToForeground(box);
    }

    function drag_start(event) {
        var style = window.getComputedStyle(event.target.parentElement, null);
        event.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"),10) - event.clientX)
            + ','
            + (parseInt(style.getPropertyValue("top"),10) - event.clientY)
            + ','
            + event.target.id);
        // const ghost = new Image();
        // ghost.src = browser.extension.getURL('icons/element-ghost.png');
        // ghost.style.height = '50px';
        // ghost.style.width = 'auto';

        // let ghost = event.target.cloneNode(true);
        // ghost.style.backgroundColor = 'red';
        // ghost.style.position = 'absolute'; ghost.style.top = '0px'; ghost.style.left = '0px';
        // document.body.appendChild(ghost);
        // let cover = document.createElement('div');
        // cover.style.background = 'white';
        // cover.style.width = ghost.style.width;
        // cover.style.height = ghost.style.height;
        // cover.style.position = 'absolute';
        // cover.style.top = '0px';
        // cover.style.left = '0px';
        // cover.style.zIndex = 1002;
        event.dataTransfer.setDragImage(event.target,
            event.clientX - parseInt(event.target.parentElement.style.left),
            event.clientY - parseInt(event.target.parentElement.style.top));
        // console.log(event.target.parentElement.style.display);
        // event.target.parentElement.style.display = 'none';
        event.target.parentElement.style.transform = 'translateX(-9999px)';
    }
    function drag_over(event) {
        event.preventDefault();
        return false;
    }
    function drop(event) {
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var box = textboxes[offset[2]];
        box.container.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        box.container.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();
        // box.container.style.display = '';
        box.container.style.transform = 'none';
        return false;
    }
    document.body.addEventListener('dragover',drag_over,false);
    document.body.addEventListener('drop',drop,false);

    document.documentElement.addEventListener("keydown", (e) => { // handle keydown event
        if (e.key === 'c') { // clear local storage
            browser.storage.local.clear();
        }

        if (e.key.toLowerCase() === 'n' && e.ctrlKey && e.shiftKey) { // if Ctrl Shift N is pressed
            let id = crypto.randomUUID(); // unique id for box
            // newly created box to foreground
            if (currentSelected !== null) {
                textboxToBackground(currentSelected);
            }
            currentSelected = createTextbox(id, cursorX, cursorY, url);
            currentSelected.textarea.addEventListener('mousedown', handleMousedown);
            currentSelected.textarea.addEventListener('mouseup', handleMouseup);
            currentSelected.textarea.addEventListener('input', handleInput);
            currentSelected.textarea.addEventListener('click', handleClick);
            currentSelected.delButton.addEventListener('click', handleDelPress);
            currentSelected.associationButton.addEventListener('click', handleAssociationPress);
            currentSelected.dropdownButton.addEventListener('click', handleDropdownPress);
            currentSelected.textarea.addEventListener('dragstart', drag_start, false);
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
}

/* object with all textboxes on current page, of the form
{id: {id: id,
      container: container,
      textarea: textarea,
      delButton: delButton,
      associationButton: associationButton,
      associatedHighlight: associatedHighlight,
      new: bool
      }} */
let key = url;
let textboxes = {};
browser.storage.local.get(key).then( // get attributes of stored boxes
    function(val) {
        textboxes = loadTextboxes(val, url);
        main(textboxes);
    },
    function(err) {
        console.log("ERROR", err);
    }
);

// receive message from toolbar popup, then scroll to appropriate textbox position
browser.runtime.onMessage.addListener((request) => {
   window.scrollTo(0, request.scrollY - 200);
});
