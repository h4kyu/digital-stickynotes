document.body.style.border = "5px solid green";

// load stored textboxes
loadTextboxes();

// clear local storage
document.documentElement.addEventListener("keydown", (e) => {
    if (e.key === 'c') {
        browser.storage.local.clear();
    }
});

let currentInFront = '';

let selected_text = '';

let boxID = '';

let mouseIsOver = false;

let mouseDown = false;

let interval = '';

let cursorX = 0;
let cursorY = 0;

let cursorXInitial = 0;
let cursorYInitial = 0;


// run getSelectionText on click
document.documentElement.addEventListener("click", (e) => {
    selected_text = getSelectionText();
});

// run createTextbox when Ctrl Shift N is pressed, if text is highlighted
document.documentElement.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === 'n' && e.ctrlKey && e.shiftKey) {
        if (!selected_text[1]) {
            let boxID = crypto.randomUUID();
            createTextbox(boxID);
            document.getElementById(boxID).focus();
        }
    }
});

// get cursor position relative to document when cursor moves
document.documentElement.addEventListener("mousemove", (ev) => {
    cursorX = ev.clientX + window.pageXOffset;
    cursorY = ev.clientY + window.pageYOffset;
});

// check if mouse is over a textbox
document.documentElement.addEventListener("mouseover", (e) => {
    if (e.target.type === "textarea") {
        boxID = e.target.id;
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
        let box = document.getElementById(boxID);
        // pull textarea from background
        if (document.getElementById(boxID).bged) {
            box.style.background = 'black';
            box.style.color = 'white';
            // if currentInFront is empty
            if (currentInFront === '') {
                currentInFront = box;
            } else if (currentInFront !== box) {
                currentInFront.style.background = 'rgba(113,113,113, 0.5)';
                currentInFront.style.color = 'rgba(113,113,113, 0.5)';
                currentInFront.bged = true;
                currentInFront = box;
            }
        }
        // get box position relative to document
        let boxLeft = parseInt(document.getElementById(boxID).style.left);
        let boxTop = parseInt(document.getElementById(boxID).style.top);
        cursorXInitial = cursorX;
        cursorYInitial = cursorY;
        let boxLeftProper = cursorXInitial - boxLeft;
        let boxTopProper = cursorYInitial - boxTop;

        // move textbox
        interval = window.setInterval(function() {
            document.getElementById(boxID).blur();
            moveTextbox(boxID, cursorX - boxLeftProper, cursorY - boxTopProper);
            }, 10);
    } else {
        if (currentInFront !== '') {
            currentInFront.style.background = 'rgba(113,113,113, 0.5)';
            currentInFront.style.color = 'rgba(113,113,113, 0.5)';
            currentInFront.bged = true;
            currentInFront = '';
        }
        if (focusedElement.type === 'textarea') {
            focusedElement.style.background = 'rgba(113,113,113, 0.5)';
            focusedElement.style.color = 'rgba(113,113,113, 0.5)';
            focusedElement.bged = true;
        }
    }
});

// check if mouse is down
document.documentElement.addEventListener("mouseup", (event) => {
    mouseDown = false;
    // cancel interval
    window.clearInterval(interval);
});

// check if esc or enter are pressed
document.documentElement.addEventListener("keydown", (e) => {
    let focusedElement = document.activeElement;
    if (e.key === "Escape") {
        console.log("esc pressed");
        // if focusedElement is a newly created textarea, delete textarea and remove from storage
        if (focusedElement.type === "textarea" && focusedElement.new) {
            // remove from storage
            const k = window.location.href;
            let ID = focusedElement.id;
            let got = browser.storage.local.get(k).then(
                    function(val) {
                        // iterate over array of box attributes to find box with boxID
                        for (let i = 0; i < val[k].length; i++) {
                            // check for box with ID
                            if (val[k][i][0] === ID) {
                                // remove box attributes array of box with ID
                                val[k].splice(i, 1);
                                let setVars = {};
                                setVars[k] = val[k];
                                browser.storage.local.set(setVars);
                            }
                        }
                    },
                    function(err) {
                        console.log("ERROR", err);
                    }
                    );
            // remove from document
            focusedElement.remove();
        } else if (focusedElement.type === "textarea" && !focusedElement.new) {
            // blur off and push to background
            focusedElement.style.background = 'rgba(113,113,113, 0.5)';
            focusedElement.style.color = 'rgba(113,113,113, 0.5)';
            focusedElement.bged = true;
            focusedElement.blur();
        } else if (currentInFront !== '') {
            currentInFront.style.background = 'rgba(113,113,113, 0.5)';
            currentInFront.style.color = 'rgba(113,113,113, 0.5)';
            currentInFront.bged = true;
            currentInFront = '';
        }

    // if enter is pressed while focusedElement is a textarea, blur off of it and push it to the background
    } else if (e.key === "Enter") {
        console.log("enter pressed");
        if (focusedElement.type === "textarea") {
            focusedElement.style.background = 'rgba(113,113,113, 0.5)';
            focusedElement.style.color = 'rgba(113,113,113, 0.5)';
            focusedElement.new = false;
            focusedElement.bged = true;
            focusedElement.blur();
        } else if (currentInFront !== '') {
            currentInFront.style.background = 'rgba(113,113,113, 0.5)';
            currentInFront.style.color = 'rgba(113,113,113, 0.5)';
            currentInFront.bged = true;
            currentInFront = '';
        }
    }
});
