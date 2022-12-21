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
      document.getElementById(document.boxID).focus();
    }
  }
});


var mouseIsOver = false;

var boxID = '';

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

// check if mouse is down or up
// var mouseDown = false;
document.documentElement.addEventListener("mousedown", (event) => {
  console.log("mousedown!!!");
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
      console.log("ACTIVATED");
      console.log(cursorX, cursorY);
      document.getElementById(boxID).blur();
      moveTextbox(boxID, cursorX - boxLeftProper, cursorY - boxTopProper);
    }, 10);
  }
});
document.documentElement.addEventListener("mouseup", (event) => {
  console.log("mouseup!!!");
  mouseDown = false;
  // cancel interval
  window.clearInterval(interval);
});

// move textbox with ID of boxID when cursor is above textbox and mouse is down
document.documentElement.addEventListener("mouseover", (e) => {
  // check if mouse is over a textbox
  if (e.target.type == "textarea") {
    boxID = e.target.id;
    mouseIsOver = true;
  } else {
    mouseIsOver = false;
  }
});
