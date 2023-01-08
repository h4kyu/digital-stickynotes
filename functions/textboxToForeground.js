// pull box to foreground
function textboxToForeground(box) {
    let textarea = box.textarea;
    textarea.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.bged = false;
    textarea.blur();
    if (box.associatedHighlight !== null) {
        box.associatedHighlight.style.backgroundColor = 'rgba(120, 120, 190, 0.5)';
    }
}