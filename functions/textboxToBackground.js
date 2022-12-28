// push textbox container to background
function textboxToBackground(textarea) {
    textarea.style.background = 'rgba(243, 224, 63, 1)';
    textarea.style.color = 'rgba(50, 50, 50, 0.75)';
    textarea.style.border = 'solid 1px rgba(255, 150, 0, 0.75)';
    textarea.bged = true;
    textarea.blur();
}