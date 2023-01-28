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
        value.movementDiv.addEventListener('dragstart', drag_start, false);
        value.copyButton.addEventListener('click', handleCopyPress);
    }

    document.documentElement.addEventListener("mousemove", (e) => { // handle mousemove event
        // keep cursor position updated
        cursorX = e.clientX + window.pageXOffset;
        cursorY = e.clientY + window.pageYOffset;
    });


    document.documentElement.addEventListener("mouseover", (e) => { // handle mouseover event
        // check if mouse is over a textbox
        if (e.target.isMyBox) {
            currentMouseOver = textboxes[e.target.id];
            currentMouseOver.associationButton.style.display = '';
            currentMouseOver.movementDiv.style.display = '';
            currentMouseOver.copyButton.style.display = '';
        } else {
            if (currentSelected === null) {
                currentMouseOver.associationButton.style.display = 'none';
                currentMouseOver.movementDiv.style.display = 'none';
                currentMouseOver.copyButton.style.display = 'none';
            }
            currentMouseOver = null;
        }
    });

    document.documentElement.addEventListener("mousedown", function(event) { // handle mousedown event
        //    mouseDown = true;

        if (currentMouseOver === null) {
            if (event.target.name !== 'delButton'
                && event.target.name !== 'associationButton'
                && event.target.name !== 'movementDiv'
                && event.target.name !== 'copyButton') {
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
    }

    function handleMouseup() {
        mouseDown = false;
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

    function handleClick(event) {
        let box = textboxes[event.target.id];
        // pull box from background
        textboxToForeground(box);
    }

    function drag_start(event) {
        let style = window.getComputedStyle(event.target.parentElement, null);
        event.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"),10) - event.clientX)
            + ','
            + (parseInt(style.getPropertyValue("top"),10) - event.clientY)
            + ','
            + event.target.id);

        event.dataTransfer.setDragImage(textboxes[event.target.id].textarea, 0, 15);
        event.target.parentElement.style.transform = 'translateX(-9999px)';
    }

    function drag_over(event) {
        event.preventDefault();
        return false;
    }
    function drop(event) {
        let offset = event.dataTransfer.getData("text/plain").split(',');
        let box = textboxes[offset[2]];
        box.container.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        box.container.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';

        event.preventDefault();
        box.container.style.transform = 'none';

        // update storage
        updateStorage(box, 2, url);

        return false;
    }

    function handleCopyPress(event) {
        let box = textboxes[event.target.id];
        box.textarea.select();
        navigator.clipboard.writeText(box.textarea.value);
        textboxToForeground(box);
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
            currentSelected.movementDiv.addEventListener('dragstart', drag_start, false);
            currentSelected.copyButton.addEventListener('click', handleCopyPress);
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
                    currentSelected = null;
                }
            } else if (e.key === 'Enter' && !e.shiftKey) {
                if (box.textarea.value) {
                    textboxToBackground(box);
                    currentSelected = null;
                    box.new = false;
                } else {
                    deleteTextbox(box, url);
                }
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

let allNodes = [];

// actually start at the common ancestor container and traverse the tree until we find the start node
function getTextNodes(node, reachedStartContainer, startContainer, endContainer) {
    if (node === startContainer) {
        return [true, [node], false];
    }
    if (node === endContainer) {
        return [reachedStartContainer, [node], true];
    }
    if (node.nodeType === Node.TEXT_NODE) {
        if (reachedStartContainer) {
            return [reachedStartContainer, [node], false];
        }
        return [reachedStartContainer, [], false];
    }

    let nodes = [];
    var stop = false;
    for (var i = 0 ; i < node.childNodes.length ; i++) {
        var [reachedStartContainer, newNodes, stop] = getTextNodes(node.childNodes[i], reachedStartContainer, startContainer, endContainer);
        nodes.push(...newNodes);
        if (stop) {
            return [reachedStartContainer, nodes, stop];
        }
    }
    return [reachedStartContainer, nodes, stop];
}


document.body.addEventListener('click', (event) => {
    let selection = window.getSelection();
    let allNodes = [];
    for (let i = 0; i < selection.rangeCount; i++) {
        let range = selection.getRangeAt(i);
        let startContainer = range.startContainer;
        let endContainer = range.endContainer;
        let commonAncestorContainer = range.commonAncestorContainer;
        // console.log("calliing with commonAncestorContainer: ", commonAncestorContainer, "start: ", startContainer, "end: ", endContainer);
        debugger;
        let foo = getTextNodes(commonAncestorContainer, false, startContainer, endContainer);
        console.log(foo);
        allNodes.push(...foo[1]);
    }
    // console.log(allNodes);
    // console.log(selection);
    // console.log(selection.anchorOffset, selection.focusOffset);
    // TODO try highlighting
    /* TODO try surrounding text node with stylable element by getting text node position in parent element and
    *   wrapping it with element.
    * ex. <div><span>some</span>random<i>text</i></div>
    * alternatively can try to create a range around textnode? */
    // for (let i = 0; i < allNodes.length; i++) {
    //     let node = allNodes[i];
    //     let surroundRange = new Range();
    //     let rangeStart, rangeEnd;
    //     if (i === 0) { // offset first highlight
    //         rangeStart = selection.anchorOffset;
    //         rangeEnd = node.length;
    //     } else if (i === allNodes.length - 1) { // offset last highlight
    //         rangeStart = 0;
    //         rangeEnd = selection.focusOffset;
    //     } else {
    //         rangeStart = 0;
    //         rangeEnd = node.length;
    //     }
    //
    //     let surroundParent = document.createElement('span');
    //     surroundParent.style.backgroundColor = 'yellow';
    //     surroundParent.style.display = 'inline';
    //     surroundRange.setStart(node, rangeStart);
    //     surroundRange.setEnd(node, rangeEnd);
    //     // console.log('innerHTML before:', node.parentNode.innerHTML);
    //     surroundRange.surroundContents(surroundParent);
    //     // console.log('innerHTML after:', node.parentNode.innerHTML);


    // if (i === 0) { // offset first highlight
    //     let surroundRange = new Range();
    //     surroundRange.setStart(node, selection.anchorOffset);
    //     surroundRange.setEnd(node, node.length);
    //     let surroundParent = document.createElement('span');
    //     surroundParent.style.backgroundColor = 'yellow';
    //     surroundParent.style.display = 'inline';
    //     surroundRange.surroundContents(surroundParent);
    //     continue;
    // } else if (i === allNodes.length - 1) { // offset last highlight
    //     let surroundRange = new Range();
    //     surroundRange.setStart(node, 0);
    //     surroundRange.setEnd(node, selection.focusOffset);
    //     let surroundParent = document.createElement('span');
    //     surroundParent.style.backgroundColor = 'yellow';
    //     surroundParent.style.display = 'inline';
    //     surroundRange.surroundContents(surroundParent);
    //     continue;
    // }
    // let parent = node.parentNode;
    // let index = Array.prototype.indexOf.call(parent.childNodes,  node);
    // let surroundRange = new Range();
    // surroundRange.setStart(parent, index);
    // surroundRange.setEnd(parent, index + 1);
    // let surroundParent = document.createElement('span');
    // surroundParent.style.backgroundColor = 'yellow';
    // surroundParent.style.display = 'inline';
    // surroundRange.surroundContents(surroundParent);
    // }
    // selection.removeAllRanges();
});
