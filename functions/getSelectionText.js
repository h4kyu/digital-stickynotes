// gets selected text and its position relative to document
function getSelectionText() {
    var text = "";
    var pos = "";
    var empty = true;

    // highlight selected text
    function highlightRange(range) {
      var newNode = document.createElement("div");
      newNode.style.backgroundColor = "green";
      newNode.style.display = "inline";
      range.surroundContents(newNode);
      console.log("highlighted!!!");
    }



    // function getSafeRanges(dangerous) {
    //   var a = dangerous.commonAncestorContainer;
    //   // Starts -- Work inward from the start, selecting the largest safe range
    //   var s = new Array(0), rs = new Array(0);
    //   if (dangerous.startContainer != a)
    //       for(var i = dangerous.startContainer; i != a; i = i.parentNode)
    //           s.push(i)
    //   ;
    //   if (0 < s.length) for(var i = 0; i < s.length; i++) {
    //       var xs = document.createRange();
    //       if (i) {
    //           xs.setStartAfter(s[i-1]);
    //           xs.setEndAfter(s[i].lastChild);
    //       }
    //       else {
    //           xs.setStart(s[i], dangerous.startOffset);
    //           xs.setEndAfter(
    //               (s[i].nodeType == Node.TEXT_NODE)
    //               ? s[i] : s[i].lastChild
    //           );
    //       }
    //       rs.push(xs);
    //   }
    //
    //   // Ends -- basically the same code reversed
    //   var e = new Array(0), re = new Array(0);
    //   if (dangerous.endContainer != a)
    //       for(var i = dangerous.endContainer; i != a; i = i.parentNode)
    //           e.push(i)
    //   ;
    //   if (0 < e.length) for(var i = 0; i < e.length; i++) {
    //       var xe = document.createRange();
    //       if (i) {
    //           xe.setStartBefore(e[i].firstChild);
    //           xe.setEndBefore(e[i-1]);
    //       }
    //       else {
    //           xe.setStartBefore(
    //               (e[i].nodeType == Node.TEXT_NODE)
    //               ? e[i] : e[i].firstChild
    //           );
    //           xe.setEnd(e[i], dangerous.endOffset);
    //       }
    //       re.unshift(xe);
    //   }
    //
    //   // Middle -- the uncaptured middle
    //   if ((0 < s.length) && (0 < e.length)) {
    //       var xm = document.createRange();
    //       xm.setStartAfter(s[s.length - 1]);
    //       xm.setEndBefore(e[e.length - 1]);
    //   }
    //   else {
    //       return [dangerous];
    //   }
    //
    //   // Concat
    //   rs.push(xm);
    //   response = rs.concat(re);
    //
    //   // Send to Console
    //   return response;
    // }
    //
    //
    // function highlightSelection() {
    //   var userSelection = window.getSelection().getRangeAt(0);
    //   console.log(userSelection);
    //   var safeRanges = getSafeRanges(userSelection);
    //   console.log(safeRanges);
    //   for (var i = 0; i < safeRanges.length; i++) {
    //       highlightRange(safeRanges[i]);
    //   }
    // }



    // if (window.getSelection) {
    text = window.getSelection().toString();
    // position relative to document
    pos = getCoords(window.getSelection().getRangeAt(0));
    console.log(pos);

    console.log(window.getSelection().getRangeAt(0));

    // highlightRange(window.getSelection().getRangeAt(0));

    // } else if (document.selection && document.selection.type != "Control") {
    //   text = document.selection.createRange().text;
    //   // highlightRange(document.selection.getRangeAt(0));
    // }


    document.body.style.border = "10px solid blue"
    console.log(text);


    // highlightSelection();
    // console.log("done");

    // create textbox attributes for selected text
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
