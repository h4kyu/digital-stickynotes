// creates a textbox
function createTextbox() {
  var boxID = document.boxID;
  // setup box object
  var box = document.createElement("input");
  box.type = "text";
  box.id = boxID;
  document.body.appendChild(box);

  // set position of box
  box.style.position = 'absolute';
  var leftPX = document.TxtBoxLeft + 'px';
  var topPX = document.TxtBoxTop + 'px';
  box.style.left = leftPX;
  box.style.top = topPX;

  console.log("boxedboxed");
}
