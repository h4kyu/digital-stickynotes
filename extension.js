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
    }
    console.log("!!!hotkeys pressed!!!");
  }
});
