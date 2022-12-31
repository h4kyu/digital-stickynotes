const url = window.location.href;

let currentInFront = '';

let currentMouseOver;

let interval;
let intervalExists = false;

let mouseIsOver = false;

let mouseDown = false;

let cursorX = 0;
let cursorY = 0;

let cursorXInitial = 0;
let cursorYInitial = 0;
let boxLeftOffset = 0;
let boxTopOffset = 0;
let boxLeftInitial = 0;
let boxTopInitial = 0;

let selection;

let allRanges = [];


// load stored textboxes
loadTextboxes(url);

document.body.focus();

// clear local storage
document.documentElement.addEventListener("keydown", (e) => {
    if (e.key === 'c') {
        browser.storage.local.clear();
    }
//    if (e.key === 'p') {
//        console.log(tempSelection);
//        tempSelection.removeAllRanges();
//        if (allRanges.length > 0) {
//            for (let i = 0; i < allRanges.length; i++) {
//                tempSelection.addRange(allRanges[i]);
//            }
//        }
//    }
});

/*
<span class="mw-page-title-main">Cy<div style="background-color: green;display:inline">press</div></span>
*/

document.documentElement.addEventListener("click", (e) => {

    // get all ranges of user selection
//    selection = window.getSelection();
//    if (!selection.isCollapsed && temp) {
//        tempSelection = selection;
//
//        allRanges = [];
//        for (let i = 0; i < selection.rangeCount; i++) {
//            allRanges.push(selection.getRangeAt(i));
//        }
//        temp = false;
//    }


    /* highlighting user seletion, not working but keep
    let rangeCount = selection.rangeCount;
    let allRanges = [];
    for (let i = 0; i < rangeCount; i++) {
        allRanges.push(selection.getRangeAt(i));
    }
    if (rangeCount > 0) {
        {
            // first range
            const firstRange = selection.getRangeAt(0);
            const parEl = firstRange.startContainer.parentElement;
            const text = parEl.innerText;
            if (parEl.innerText.length === 0) {
                return;
            }
            const startOffset = firstRange.startOffset;
            const endOffset = firstRange.endOffset;
            if (parEl === firstRange.endContainer.parentElement) { // start and end of selection are in same element
                parEl.innerHTML =
                text.substring(0, startOffset) +
                "<span style='background-color: green'>" +
                text.substring(startOffset, endOffset) +
                "</span>" +
                text.substring(endOffset);
            } else {
                parEl.innerHTML =
                text.substring(0, startOffset) +
                "<span style='background-color: green'>" +
                text.substring(startOffset) +
                "</span>";
            }
        }

        {
            // last range
            const lastRange = selection.getRangeAt(rangeCount - 1);
            const parEl = lastRange.endContainer.parentElement;
            const text = parEl.innerText;
            if (parEl.innerText.length === 0) {
                return;
            }
            const startOffset = lastRange.startOffset;
            const endOffset = lastRange.endOffset;
            if (parEl === lastRange.startContainer.parentElement) { // start and end of selection are in same element
                parEl.innerHTML =
                    text.substring(0, startOffset) +
                    "<span style='background-color: green'>" +
                    text.substring(startOffset, endOffset) +
                    "</span>" +
                    text.substring(endOffset);
            } else {
                parEl.innerHTML =
                    "<span style='background-color: green'>" +
                    text.substring(0, endOffset) +
                    "</span>" +
                    text.substring(endOffset);
            }
        }
    }

    document.querySelectorAll('*').forEach(function(node) {
        const range = document.createRange();
        range.selectNode(node);

        for (let i = 0; i < rangeCount; i++) {
            let curRange = allRanges[i];
            const isStartAfter = (range.compareBoundaryPoints(Range.START_TO_START, curRange) >= 0);
            const isEndBefore = (range.compareBoundaryPoints(Range.END_TO_END, curRange) <= 0);

            if (isStartAfter && isEndBefore) {
                if (node.hasChildNodes()) {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        if (node.childNodes[i].nodeType === Node.TEXT_NODE) {
                            const range = document.createRange();
                            range.selectNode(node.childNodes[i]);
                            let newNode = document.createElement("span");
                            newNode.style.backgroundColor = "green";
                            range.surroundContents(newNode);
                        }
                    }
                }
            }
        }
    });
    */

    // if delButton is clicked, delete container and remove from storage
    if (e.target.nodeName === 'BUTTON') {
        let container = e.target.parentNode;
        let textarea = container.firstChild;
        // if button is delButton, delete textbox
        if (e.target.id === 'delButton') {
            deleteTextbox(container, url);
        }
        // if button is associationButton,
        else if (e.target.id === 'associationButton') {
            // get first and last range of user selection
            let selection = window.getSelection();
            if (selection.rangeCount >= 1) {
                let firstRange = selection.getRangeAt(0);
                let lastRange = selection.getRangeAt(selection.rangeCount - 1);

                textboxToForeground(textarea);
                currentInFront = textarea;
                // create box around general area of user selection (top left corner to bottom right corner)
                let posFirstRange = getCoords(firstRange);
                let posLastRange = getCoords(lastRange);

                // get coordinates for box placement
                let top = posFirstRange.top;
                let left = posFirstRange.left;
                let width = Math.max(posFirstRange.width, posLastRange.width);
                let height = posLastRange.bottom - posFirstRange.clientTop;

                // create the overlapping box
                let highlightBox = document.createElement('div');
                textarea.highlightBox = highlightBox;
                document.body.appendChild(highlightBox);
                highlightBox.style.position = 'absolute';
                highlightBox.style.zIndex = 999;
                highlightBox.style.backgroundColor = 'rgba(120, 120, 190, 0.5)';
                highlightBox.style.left = left + 'px';
                highlightBox.style.top = top + 'px';
                highlightBox.style.height = height + 'px';
                highlightBox.style.width = width + 'px';
                highlightBox.style.borderRadius = '7px';

                // add to textarea and save to storage
                textarea.highlightBoxAttributes = [highlightBox.style.left,
                                                   highlightBox.style.top,
                                                   highlightBox.style.height,
                                                   highlightBox.style.width];
                // get textarea that was changed
                let ID = textarea.id;
                let got = browser.storage.local.get(url).then(
                        function(val) {
                            // iterate over array of box attributes to find box with ID
                            for (let i = 0; i < val[url].length; i++) {
                                // check for box with boxID
                                if (val[url][i][0] === ID) {
                                    // update highlightBox
                                    val[url][i][4] = textarea.highlightBoxAttributes; // need to redo, can't save object
                                    let setVars = {};
                                    setVars[url] = val[url];
                                    browser.storage.local.set(setVars);
                                }
                            }
                        },
                        function(err) {
                            console.log("ERROR", err);
                        }
                        );

                selection.removeAllRanges();
            }

//            selection = window.getSelection();
//            if (!selection.isCollapsed) {
//                for (let i = 0; i < selection.rangeCount; i++) {
//                    textarea.associatedSelection.push(selection.getRangeAt(i));
//                }
//            }
        }
    }

//    if (e.target.type === 'textarea') {
//        let box = e.target;
//        // pull textarea from background
//        if (box.bged) {
//            textboxToForeground(box);
//            // select and highlight associatedSelection of box
////            if (box.associatedSelection !== null) {
////                let tempSelection = window.getSelection();
////                tempSelection.removeAllRanges();
////                for (let i = 0; i < box.associatedSelection.length; i++) {
////                    tempSelection.addRange(box.associatedSelection[i]);
////                }
////            }
//            // if currentInFront is empty
//            if (currentInFront === '') {
//                currentInFront = box;
//            } else if (currentInFront !== box) {
//                textboxToBackground(currentInFront);
//                currentInFront = box;
//            }
//            // if textarea is already pushed foward
//        } else {
//            currentInFront.focus();
//        }
//    }
});

// get cursor position relative to document when cursor moves
document.documentElement.addEventListener("mousemove", (ev) => {
    cursorX = ev.clientX + window.pageXOffset;
    cursorY = ev.clientY + window.pageYOffset;
    if (mouseIsOver && mouseDown) {
        // move textbox
        if (!intervalExists) {
            interval = window.setInterval(function() {
                if (mouseDown && mouseIsOver) {
                    currentMouseOver.blur();
                    moveTextbox(currentMouseOver.id, cursorX - boxLeftOffset, cursorY - boxTopOffset, url);
                }
            }, 10);
            intervalExists = true;
        }
    }
});


// check if mouse is over a textbox
document.documentElement.addEventListener("mouseover", (e) => {
    if (e.target.type === "textarea") {
        currentMouseOver = e.target;
        mouseIsOver = true;
    } else {
        mouseIsOver = false;
    }
});

// check if mouse is down
document.documentElement.addEventListener("mousedown", (event) => {
    // do the same thing as pressing enter when focus is on textarea
    let focusedElement = document.activeElement;
    if (focusedElement.type === 'textarea') {
        focusedElement.new = false;
    }

    mouseDown = true;
    // check if cursor is over a textbox
    if (mouseIsOver) {
        let box = currentMouseOver;
        let container = currentMouseOver.parentNode;
        cursorXInitial = event.clientX + window.pageXOffset;
        cursorYInitial = event.clientY + window.pageYOffset;
        // get box position relative to document
        boxLeftInitial = parseInt(container.style.left);
        boxTopInitial = parseInt(container.style.top);
        boxLeftOffset = cursorXInitial - boxLeftInitial;
        boxTopOffset = cursorYInitial - boxTopInitial;

            // pull textarea from background
        if (box.bged) {
            textboxToForeground(box);
            // select and highlight associatedSelection of box
            //            if (box.associatedSelection !== null) {
            //                let tempSelection = window.getSelection();
            //                tempSelection.removeAllRanges();
            //                for (let i = 0; i < box.associatedSelection.length; i++) {
            //                    tempSelection.addRange(box.associatedSelection[i]);
            //                }
            //            }
            // if currentInFront is empty
            if (currentInFront === '') {
                currentInFront = box;
            } else if (currentInFront !== box) {
                textboxToBackground(currentInFront);
                currentInFront = box;
            }
        // if textarea is already pushed foward
        } else {
            currentInFront.focus();
        }
    } else {
        if (currentInFront !== '') {
            textboxToBackground(currentInFront);
            currentInFront = '';
        }
        if (focusedElement.type === 'textarea') {
            textboxToBackground(focusedElement);
        }
    }
});

// check if mouse is down
document.documentElement.addEventListener("mouseup", (event) => {
    mouseDown = false;
    // cancel interval
    window.clearInterval(interval);
    intervalExists = false;
});

// check if esc or enter are pressed
document.documentElement.addEventListener("keydown", (e) => {
    // run createTextbox when Ctrl Shift N is pressed
    if (e.key.toLowerCase() === 'n' && e.ctrlKey && e.shiftKey) {
        let boxID = crypto.randomUUID();
        if (currentInFront !== '') {
            currentInFront.blur();
        }
        currentInFront = createTextbox(boxID, cursorX, cursorY, url).textarea;
        currentInFront.focus();
    }
    let focusedElement = document.activeElement;
    if (e.key === "Escape") {
        // if focusedElement is a newly created textarea, delete textarea and remove from storage
        if (focusedElement.type === "textarea" && focusedElement.new) {
            deleteTextbox(focusedElement.parentNode, url);
        } else if (focusedElement.type === "textarea" && !focusedElement.new) {
            // blur off and push to background
            textboxToBackground(focusedElement);
        } else if (currentInFront !== '') {
            textboxToBackground(currentInFront);
            currentInFront = '';
        }

    // if enter is pressed while focusedElement is a textarea, blur off of it and push it to the background
    } else if (e.key === "Enter" && !e.shiftKey) {
        if (focusedElement.type === "textarea") {
            textboxToBackground(focusedElement);
            focusedElement.new = false;
        } else if (currentInFront !== '') {
            textboxToBackground(currentInFront);
            currentInFront = '';
        }
    }
});

// update stored input of textarea when its value changes
document.addEventListener('input', (e) => {
    // get textarea that was changed
    let ID = e.target.id;
    let got = browser.storage.local.get(url).then(
            function(val) {
                // iterate over array of box attributes to find box with ID
                for (let i = 0; i < val[url].length; i++) {
                    // check for box with boxID
                    if (val[url][i][0] === ID) {
                        // update input
                        val[url][i][1] = e.target.value;
                        let setVars = {};
                        setVars[url] = val[url];
                        browser.storage.local.set(setVars);
                    }
                }
            },
            function(err) {
                console.log("ERROR", err);
            }
            );
})
