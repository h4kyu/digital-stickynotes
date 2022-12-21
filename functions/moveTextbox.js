// move textbox with ID of boxID
function moveTextbox(boxID, boxL, boxT) {
  var box = document.getElementById(boxID);
  // set textbox position to cursor position
  box.style.left = boxL + 'px';
  box.style.top = boxT + 'px';
}
