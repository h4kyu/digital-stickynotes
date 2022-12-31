// push textbox container to background
function textboxToBackground(textarea) {
    textarea.style.background = 'rgba(80, 90, 115, 0.85)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.bged = true;
    textarea.blur();
    if (textarea.highlightBox) {
        textarea.highlightBox.style.backgroundColor = 'rgba(50, 85, 120, 0.25)';
    }
}