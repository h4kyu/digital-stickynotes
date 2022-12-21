// move textbox with ID of boxID
function moveTextbox(boxID, cursorX, cursorY) {
  var box = document.getElementById(boxID);
  // set textbox position to cursor position
  box.style.left = cursorX + 'px';
  box.style.top = cursorY + 'px';
}
