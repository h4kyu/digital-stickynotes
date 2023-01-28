// pull box to foreground
function textboxToForeground(box) {
    let textarea = box.textarea;
    let container = box.container;
    textarea.style.whiteSpace = 'pre-line';
    let span = document.createElement('span');
    document.body.appendChild(span);
    span.style.width = '300px';
    span.style.whiteSpace = 'pre-line';
    span.style.boxSizing = 'border-box';
    // span.style.resize = 'none';
    span.style.position = 'absolute';
    span.style.fontSize = '13px';
    span.style.fontFamily = 'Verdana, sans-serif';
    span.style.padding = '5px 20px 6px 10px';
    span.innerHTML = textarea.value;


    container.style.height = 0;
    container.style.height = span.clientHeight + 25 + 'px';
    textarea.style.height = span.clientHeight + 'px';
    textarea.style.width = '275px';
    span.remove();
    container.style.width = '300px';
    textarea.style.padding = '5px 20px 6px 10px';
    textarea.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    textarea.style.color = 'aliceblue';
    textarea.style.border = 'solid 1px lightblue';
    textarea.bged = false;
    // textarea.blur();
    if (box.associatedHighlight !== null) {
        box.associatedHighlight.style.backgroundColor = 'rgba(120, 120, 190, 0.5)';
    }
    // show buttons
    box.associationButton.style.display = '';
    box.movementDiv.style.display = '';
    box.copyButton.style.display = '';
}