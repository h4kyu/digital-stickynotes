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

// actually start at the common ancestor container and traverse the tree until we find the start node
function getTextNodes(node, reachedStartContainer, startContainer, endContainer) {
    if (node === startContainer) {
        return [true, [], false];
    }
    if (node === endContainer) {
        return [reachedStartContainer, [], true];
    }
    if (node.nodeType === Node.TEXT_NODE) {
        if (reachedStartContainer) {
            return [reachedStartContainer, [node], false];
        }
        return [reachedStartContainer, [], false];
    }

    let nodes = [];
    var stop = false;
    for (let i = 0 ; i < node.childNodes.length ; i++) {
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
    let startContainers = [];
    let endContainers = [];
    let allRanges = [];
    for (let i = 0; i < selection.rangeCount; i++) {
        let range = selection.getRangeAt(i);
        allRanges.push(range);
        let startContainer = range.startContainer;
        startContainers.push(startContainer);
        let endContainer = range.endContainer;
        endContainers.push(endContainer);
        let commonAncestorContainer = range.commonAncestorContainer;
        let foo = getTextNodes(commonAncestorContainer, false, startContainer, endContainer);
        console.log('ancestor:', commonAncestorContainer, 'startContainer:', startContainer, 'endContainer', endContainer, range.startOffset, range.endOffset);
        if (commonAncestorContainer === startContainer && startContainer === endContainer) { // all within the same text node
            let surroundRange = new Range();
            let rangeStart, rangeEnd;
            rangeStart = range.startOffset;
            rangeEnd = range.endOffset;

            let surroundParent = document.createElement('span');
            surroundParent.style.backgroundColor = 'yellow';
            surroundParent.style.display = 'inline';
            surroundRange.setStart(startContainer, rangeStart);
            surroundRange.setEnd(startContainer, rangeEnd);
            surroundRange.surroundContents(surroundParent);
        }
        allNodes.push(...foo[1]);
    }
    for (let i = 0; i < allRanges.length; i++) {
        let range = allRanges[i];
        let a = range.commonAncestorContainer;
        // Starts -- Work inward from the start, selecting the largest safe range
        let s = new Array(0), rs = new Array(0);
        if (range.startContainer !== a) {
            for (let i = range.startContainer; i !== a; i = i.parentNode) {
                s.push(i);
            }
        }
        if (0 < s.length) for (let i = 0; i < s.length; i++) {
            let xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i-1]);
                xs.setEndAfter(s[i].lastChild);
            } else {
                xs.setStart(s[i], range.startOffset);
                xs.setEndAfter(
                    (s[i].nodeType === Node.TEXT_NODE)
                        ? s[i] : s[i].lastChild
                );
            }
            rs.push(xs);
        }

        // Ends -- basically the same code reversed
        let e = new Array(0), re = new Array(0);
        if (range.endContainer !== a) {
            for (let i = range.endContainer; i !== a; i = i.parentNode) {
                e.push(i);
            }
        }
        if (0 < e.length) for (let i = 0; i < e.length; i++) {
            let xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i-1]);
            }
            else {
                xe.setStartBefore(
                    (e[i].nodeType === Node.TEXT_NODE)
                        ? e[i] : e[i].firstChild
                );
                xe.setEnd(e[i], range.endOffset);
            }
            re.unshift(xe);
        }

        let final = rs.concat(re);

        for (let i = 0; i < final.length; i++) {
            let range = final[i];
            let surroundParent = document.createElement('span');
            surroundParent.style.backgroundColor = 'yellow';
            surroundParent.style.display = 'inline';
            range.surroundContents(surroundParent);
        }
    }

    for (let i = 0; i < allNodes.length; i++) {
        let node = allNodes[i];
        let surroundRange = new Range();
        let rangeStart, rangeEnd;
        rangeStart = 0;
        rangeEnd = node.length;

        let surroundParent = document.createElement('span');
        surroundParent.style.backgroundColor = 'yellow';
        surroundParent.style.display = 'inline';
        surroundRange.setStart(node, rangeStart);
        surroundRange.setEnd(node, rangeEnd);
        surroundRange.surroundContents(surroundParent);
    }
    selection.removeAllRanges();
});
