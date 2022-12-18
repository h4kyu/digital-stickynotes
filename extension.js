document.body.style.border = "5px solid green";

var selected_text_attributes = true;

console.log("fdafdsa");
// run getSelectionText on click
document.documentElement.addEventListener("click", (e) => {
  selected_text = getSelectionText();
  console.log("A");
  console.log(selected_text);
  console.log("B");
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

console.log("BBBBBB");

console.log(hello("nahshon"));
