// initializes textbox with all proper customizations
function initializeTextbox(container, textarea, delButton, associationButton, highlightBoxAttributes) {
    // container
    container.style.position = 'absolute';
    container.style.resize = 'none';
    container.style.height = '100px';
    container.style.width = '350px';
    // textarea
    container.appendChild(textarea);
    textarea.style.resize = 'none';
    textarea.style.fontSize = '13px';
    textarea.style.fontFamily = "Courier New, monospace";
    textarea.style.padding = '5px 20px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.borderRadius = '7px';
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.boxSizing = 'border-box';
    // delButton
    container.appendChild(delButton);
    delButton.style.width = '20px';
    delButton.style.height = '20px';
    delButton.style.fontFamily = "monospace";
    delButton.style.fontSize = '15px';
    delButton.style.color = 'lightblue';
    delButton.style.padding = '0px 0px';
    delButton.style.backgroundColor = 'transparent';
    delButton.style.borderRadius = '4px';
    delButton.style.border = 'none';
    delButton.style.outline = 'none';
    let delButtonSymbol = document.createTextNode('x');
    delButton.appendChild(delButtonSymbol);
    delButton.style.position = 'absolute';
    delButton.style.right = '0px';
    delButton.style.top = '0px';
    // associationButton
    container.appendChild(associationButton);
    associationButton.style.width = '20px';
    associationButton.style.height = '20px';
    associationButton.style.fontFamily = "monospace";
    associationButton.style.fontSize = '15px';
    associationButton.style.color = 'lightblue';
    associationButton.style.padding = '0px 0px';
    associationButton.style.backgroundColor = 'transparent';
    associationButton.style.borderRadius = '4px';
    associationButton.style.border = 'none';
    associationButton.style.outline = 'none';
    let associationButtonSymbol = document.createTextNode('<');
    associationButton.appendChild(associationButtonSymbol);
    associationButton.style.position = 'absolute';
    associationButton.style.left = '0px';
    associationButton.style.top = '0px';
    // highlightBox
    if (highlightBoxAttributes !== null) {
        let highlightBox = document.createElement('div');
        textarea.highlightBox = highlightBox;
        document.body.appendChild(highlightBox);
        highlightBox.style.position = 'absolute';
        highlightBox.style.zIndex = 999;
        highlightBox.style.backgroundColor = 'rgba(50, 85, 120, 0.25)';
        highlightBox.style.left = highlightBoxAttributes[0];
        highlightBox.style.top = highlightBoxAttributes[1];
        highlightBox.style.height = highlightBoxAttributes[2];
        highlightBox.style.width = highlightBoxAttributes[3];
        highlightBox.style.borderRadius = '7px';
    }
}