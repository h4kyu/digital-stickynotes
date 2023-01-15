// initializes textbox with all proper customizations

function initializeTextbox(container, textarea, delButton, associationButton, dropdownButton, highlightBoxAttributes) {
    // container
    container.style.position = 'absolute';
    container.style.resize = 'none';
    container.style.height = '30px';
    container.style.width = '300px';
    // textarea
    container.appendChild(textarea);
    textarea.spellcheck = false;
    textarea.style.resize = 'none';
    textarea.style.fontSize = '13px';
    textarea.style.fontFamily = "Verdana, sans-serif";
    textarea.style.padding = '7px 20px 6px 20px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.borderRadius = '15px';
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.overflow = 'hidden'; // disables scroll bar
    // textarea.style.whiteSpace = 'nowrap';
    textarea.style.textOverflow = 'ellipsis';
    // delButton
    container.appendChild(delButton);
    delButton.style.width = '15px';
    delButton.style.height = '15px';
    delButton.style.fontFamily = "monospace";
//    delButton.style.fontSize = '15px';
    delButton.style.color = 'lightblue';
//    delButton.style.padding = '0px, 0px, 10px, 0px';
    delButton.style.backgroundColor = 'transparent';
    delButton.style.borderRadius = '4px';
    delButton.style.border = 'none';
    delButton.style.outline = 'none';
//    let delButtonSymbol = document.createTextNode('x');
//    delButton.appendChild(delButtonSymbol);
    delButton.style.backgroundImage = "url("+browser.extension.getURL('icons/close.png')+")";
    delButton.style.backgroundPosition = 'center';
    delButton.style.backgroundSize = '50%';
    delButton.style.backgroundRepeat = 'no-repeat';
    delButton.style.position = 'absolute';
    delButton.style.right = '5px';
    delButton.style.top = '7.5px';
    delButton.style.cursor = 'pointer';
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
    associationButton.style.cursor = 'pointer';
//    associationButton.style.transform = 'rotate(90deg)';
    // dropdownButton
    container.appendChild(dropdownButton);
    dropdownButton.style.width = '15px';
    dropdownButton.style.height = '15px';
    dropdownButton.style.fontFamily = "monospace";
    //    delButton.style.fontSize = '15px';
    dropdownButton.style.color = 'lightblue';
    //    delButton.style.padding = '0px, 0px, 10px, 0px';
    dropdownButton.style.backgroundColor = 'transparent';
    dropdownButton.style.borderRadius = '4px';
    dropdownButton.style.border = 'none';
    dropdownButton.style.outline = 'none';
    //    let delButtonSymbol = document.createTextNode('x');
    //    delButton.appendChild(delButtonSymbol);
    dropdownButton.style.backgroundImage = "url("+browser.extension.getURL('icons/dropdown.png')+")";
    dropdownButton.style.backgroundPosition = 'center';
    dropdownButton.style.backgroundSize = '50%';
    dropdownButton.style.backgroundRepeat = 'no-repeat';
    dropdownButton.style.position = 'absolute';
    dropdownButton.style.left = '5px';
    dropdownButton.style.top = '7.5px';
    dropdownButton.style.cursor = 'pointer';
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