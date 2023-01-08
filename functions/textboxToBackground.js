// push box container to background
function textboxToBackground(box) {
    let textarea = box.textarea;
    textarea.style.background = 'rgba(80, 90, 115, 0.85)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.bged = true;
    textarea.blur();
    if (box.associatedHighlight !== null) {
        box.associatedHighlight.style.backgroundColor = 'rgba(50, 85, 120, 0.25)';
    }
}