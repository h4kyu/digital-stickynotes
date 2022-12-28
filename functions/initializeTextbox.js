// initializes textbox with all proper customizations
function initializeTextbox(container, textarea, delButton) {
    // container
    container.style.position = 'absolute';
    container.style.resize = 'none';
    container.style.height = '150px';
    container.style.width = '170px';
    // textarea
    container.appendChild(textarea);
    textarea.style.resize = 'none';
    textarea.style.fontSize = '13px';
    textarea.style.fontFamily = "Comic Sans MS, cursive";
    textarea.style.padding = '3px 10px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.borderRadius = '4px';
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.boxSizing = 'border-box';
    // delButton
    container.appendChild(delButton);
    delButton.style.width = '20px';
    delButton.style.height = '20px';
    delButton.style.fontFamily = "Helvetica, sans-serif";
    delButton.style.fontSize = '15px';
    delButton.style.color = 'orange';
    delButton.style.padding = '0px 0px';
    delButton.style.backgroundColor = 'transparent';
    delButton.style.border = 'none';
    delButton.style.outline = 'none';
    let delButtonSymbol = document.createTextNode('x');
    delButton.appendChild(delButtonSymbol);
    delButton.style.position = 'absolute';
    delButton.style.right = '0px';
    delButton.style.top = '0px';
}