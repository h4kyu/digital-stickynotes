// gets selected text and its position relative to document
function getSelectionText() {
  console.log("AAAAAA");
    var text = "";
    var pos = "";
    var empty = true;
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

    // check whether highlighted text is empty
    if (text != '') {
      empty = false;
    }
    
    return text, empty;
}
