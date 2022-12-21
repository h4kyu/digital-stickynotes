document.body.style.border = "5px solid green";

var selected_text_attributes = true;

// run getSelectionText on click
document.documentElement.addEventListener("click", (e) => {
  selected_text = getSelectionText();
});

// run createTextbox when Ctrl Shift N is pressed, if text is highlighted
document.documentElement.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === 'n' && e.ctrlKey && e.shiftKey) {
    if (!selected_text) {
      createTextbox();
      console.log(document.getElementById(document.boxID).autofocus);
      document.getElementById(document.boxID).focus();
    }
    console.log("!!!hotkeys pressed!!!");
  }
});


var mouseIsOver = false;

var boxID = '';

var mouseDown = false;

var interval = '';

var cursorX = 0;
var cursorY = 0;

// get cursor position relative to document when cursor moves
document.documentElement.addEventListener("mousemove", (ev) => {
  cursorX = ev.clientX + window.pageXOffset;
  cursorY = ev.clientY + window.pageYOffset;
});

// check if mouse is down or up
// var mouseDown = false;
document.documentElement.addEventListener("mousedown", (event) => {
  console.log("mousedown!!!");
  mouseDown = true;
  // check if cursor is over a textbox
  if (mouseIsOver) {
    // move textbox
    console.log(boxID);
    // while (mouseDown) {
    interval = window.setInterval(function() {
      console.log("ACTIVATED");
      console.log(cursorX, cursorY);
      moveTextbox(boxID, cursorX, cursorY);
    }, 10);
    // }
  }
});
document.documentElement.addEventListener("mouseup", (event) => {
  console.log("mouseup!!!");
  mouseDown = false;
  // cancel interval
  window.clearInterval(interval);
  console.log("CLEARED");
});

// move textbox with ID of boxID when cursor is above textbox and mouse is down
document.documentElement.addEventListener("mouseover", (e) => {
  // check if mouse is over a textbox
  if (e.target.type == "textarea") {
    console.log("in area!!!1");
    boxID = e.target.id;
    mouseIsOver = true;
  } else {
    mouseIsOver = false;
  }
});
