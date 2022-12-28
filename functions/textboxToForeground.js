// pull textbox container to foreground
function textboxToForeground(textarea) {
    textarea.style.backgroundColor = 'yellow';
    textarea.style.color = 'black';
    textarea.style.border = 'solid 1px orange';
    textarea.bged = false;
    textarea.blur();
}