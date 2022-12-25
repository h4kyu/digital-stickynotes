document.body.style.border = "5px solid green";

// load stored textboxes
loadTextboxes();

// clear local storage
document.documentElement.addEventListener("keydown", (e) => {
    if (e.key === 'c') {
        browser.storage.local.clear();
        console.log("storage cleared");
    }
});


var selected_text = '';

// run getSelectionText on click
document.documentElement.addEventListener("click", (e) => {
    selected_text = getSelectionText();
});

// run createTextbox when Ctrl Shift N is pressed, if text is highlighted
document.documentElement.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === 'n' && e.ctrlKey && e.shiftKey) {
        if (!selected_text) {
            var boxID = crypto.randomUUID();
            createTextbox(boxID);
            document.getElementById(boxID).focus();
        }
    }
});


var mouseIsOver = false;

var mouseDown = false;

var interval = '';

var cursorX = 0;
var cursorY = 0;

var cursorXInitial = 0;
var cursorYInitial = 0;

// get cursor position relative to document when cursor moves
document.documentElement.addEventListener("mousemove", (ev) => {
    cursorX = ev.clientX + window.pageXOffset;
    cursorY = ev.clientY + window.pageYOffset;
});

// check if mouse is down
document.documentElement.addEventListener("mousedown", (event) => {
    mouseDown = true;
    // check if cursor is over a textbox
    if (mouseIsOver) {
        // get box position relative to document
        var boxLeft = parseInt(document.getElementById(boxID).style.left);
        var boxTop = parseInt(document.getElementById(boxID).style.top);
        cursorXInitial = cursorX;
        cursorYInitial = cursorY;
        var boxLeftProper = cursorXInitial - boxLeft;
        var boxTopProper = cursorYInitial - boxTop;

        // move textbox
        interval = window.setInterval(function() {
            document.getElementById(boxID).blur();
            moveTextbox(boxID, cursorX - boxLeftProper, cursorY - boxTopProper);
            }, 10);
    }
});

// check if mouse is down
document.documentElement.addEventListener("mouseup", (event) => {
    mouseDown = false;
    // cancel interval
    window.clearInterval(interval);
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
