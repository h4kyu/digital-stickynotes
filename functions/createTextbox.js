// creates a textbox
function createTextbox() {
  var boxID = document.boxID;
  // setup box object
  var box = document.createElement("textarea");
  box.type = "text";
  box.id = boxID;
  box.autofocus = true;

  // add to page
  document.body.appendChild(box);

  // set position of box
  box.style.position = 'absolute';
  var leftPX = document.TxtBoxLeft + 'px';
  var topPX = document.TxtBoxTop + 'px';
  box.style.left = leftPX;
  box.style.top = topPX;
}
