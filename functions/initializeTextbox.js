// initializes textbox with all proper customizations

function initializeTextbox(container, textarea, delButton, associationButton, movementDiv, copyButton, highlightBoxAttributes) {
    // container
    container.style.position = 'absolute';
    container.style.resize = 'none';
    container.style.height = '55px';
    container.style.width = '300px';
    // textarea
    container.appendChild(textarea);
    textarea.spellcheck = false;
    textarea.style.position = 'absolute';
    textarea.style.fontSize = '13px';
    textarea.style.fontFamily = "Verdana, sans-serif";
    textarea.style.padding = '7px 20px 6px 10px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.borderRadius = '15px';
    textarea.style.width = '275px';
    textarea.style.height = '30px';
    textarea.style.left = '25px';
    textarea.style.bottom = '0px';
    textarea.style.resize = 'none';
    textarea.style.overflow = 'hidden'; // disables scroll bar
    // textarea.style.whiteSpace = 'nowrap';
    textarea.style.textOverflow = 'ellipsis';
    // delButton
    container.appendChild(delButton);
    delButton.style.width = '15px';
    delButton.style.height = '15px';
    delButton.style.fontFamily = "monospace";
    delButton.style.color = 'lightblue';
    delButton.style.backgroundColor = 'transparent';
    delButton.style.borderRadius = '4px';
    delButton.style.border = 'none';
    delButton.style.outline = 'none';
    delButton.style.backgroundImage = "url("+browser.extension.getURL('icons/close.png')+")";
    delButton.style.backgroundPosition = 'center';
    delButton.style.backgroundSize = '50%';
    delButton.style.backgroundRepeat = 'no-repeat';
    delButton.style.position = 'absolute';
    delButton.style.right = '5px';
    delButton.style.top = '32.5px';
    delButton.style.cursor = 'pointer';
    // associationButton
    container.appendChild(associationButton);
    associationButton.style.width = '20px';
    associationButton.style.height = '20px';
    associationButton.style.padding = '0px 0px';
    associationButton.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    associationButton.style.borderRadius = '4px';
    associationButton.style.border = 'none';
    associationButton.style.outline = 'none';
    associationButton.style.backgroundImage = "url("+browser.extension.getURL('icons/link.png')+")"
    associationButton.style.backgroundPosition = 'center';
    associationButton.style.backgroundSize = '70%';
    associationButton.style.backgroundRepeat = 'no-repeat';
    associationButton.style.position = 'absolute';
    associationButton.style.right = '0px';
    associationButton.style.top = '0px';
    associationButton.style.cursor = 'pointer';
    // movementButton
    container.appendChild(movementDiv);
    movementDiv.style.width = '20px';
    movementDiv.style.height = '20px';
    movementDiv.style.padding = '0px 0px';
    movementDiv.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    movementDiv.style.borderRadius = '4px';
    movementDiv.style.border = 'none';
    movementDiv.style.outline = 'none';
    movementDiv.style.backgroundImage = "url("+browser.extension.getURL('icons/move.png')+")"
    movementDiv.style.backgroundPosition = 'center';
    movementDiv.style.backgroundSize = '82%';
    movementDiv.style.backgroundRepeat = 'no-repeat';
    movementDiv.style.position = 'absolute';
    movementDiv.style.left = '0px';
    movementDiv.style.top = '30px';
    movementDiv.style.cursor = 'pointer';
    // copyButton
    container.appendChild(copyButton);
    copyButton.style.width = '20px';
    copyButton.style.height = '20px';
    copyButton.style.padding = '0px 0px';
    copyButton.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    copyButton.style.borderRadius = '4px';
    copyButton.style.border = 'none';
    copyButton.style.outline = 'none';
    copyButton.style.backgroundImage = "url("+browser.extension.getURL('icons/copy.png')+")"
    copyButton.style.backgroundPosition = 'center';
    copyButton.style.backgroundSize = '80%';
    copyButton.style.backgroundRepeat = 'no-repeat';
    copyButton.style.position = 'absolute';
    copyButton.style.right = '25px';
    copyButton.style.top = '0px';
    copyButton.style.cursor = 'pointer';
    // highlightBox
    if (highlightBoxAttributes !== null) {
        let highlightBox = document.createElement('div');
        textarea.highlightBox = highlightBox;
        document.body.appendChild(highlightBox);
        highlightBox.style.position = 'absolute';
        highlightBox.style.zIndex = 999;
        highlightBox.style.backgroundColor = 'rgba(50, 85, 120, 0.25)';
        highlightBox.style.top = highlightBoxAttributes[0];
        highlightBox.style.left = highlightBoxAttributes[1];
        highlightBox.style.height = highlightBoxAttributes[2];
        highlightBox.style.width = highlightBoxAttributes[3];
        highlightBox.style.borderRadius = '7px';
    }
}