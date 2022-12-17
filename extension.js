document.body.style.border = "5px solid green";

// var getCoords = require('./functions/getCoords');
// var getSelectionText = require('./functions/getSelectionText');

//import functions
// import {getCoords} from './functions/getCoords.js';
// import {getSelectionText} from './functions/getSelectionText.js';

// gets coordinates of elem in relation to document
function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

// gets selected text and its position relative to document
function getSelectionText() {
  console.log("AAAAAA");
    var text = "";
    var pos = "";
    if (window.getSelection) {
        // position relative to viewport
        // pos = window.getSelection().getRangeAt(0).getClientRects();

        text = window.getSelection().toString();
        console.log("windowElement");
        // console.log(pos);
        // position relative to document
        pos = getCoords(window.getSelection().getRangeAt(0));
        console.log(pos);

    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
        console.log("documentElement");
    }
    document.body.style.border = "10px solid blue"
    console.log(text);

    document.boxID = "foo";
    document.TxtBoxLeft = pos.left;
    document.TxtBoxTop = pos.top;
    console.log(document.TxtBoxLeft, document.TxtBoxTop);
    return text;
}

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


console.log("fdafdsa");
// run getSelectionText on click
document.documentElement.addEventListener("click", getSelectionText);
// window.windowElement.addEventListener("click", getSelectionText);
document.documentElement.addEventListener("keydown", createTextbox);

console.log("BBBBBB");
