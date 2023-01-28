// push box container to background
function textboxToBackground(box) {
    let textarea = box.textarea;
    let container = box.container;
    textarea.style.whiteSpace = 'nowrap';
    container.style.height = '55px';
    container.style.width = '135px';
    textarea.style.height = '30px';
    textarea.style.width = '110px';
    textarea.style.background = 'rgba(80, 90, 115, 0.85)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.bged = true;
    textarea.blur();
    if (box.associatedHighlight !== null) {
        box.associatedHighlight.style.backgroundColor = 'rgba(50, 85, 120, 0.25)';
    }
    // hide buttons
    box.associationButton.style.display = 'none';
    box.movementDiv.style.display = 'none';
    box.copyButton.style.display = 'none';
}