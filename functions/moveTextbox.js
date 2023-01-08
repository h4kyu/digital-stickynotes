// move box
function moveTextbox(box, movementX, movementY, url) {
    let container = box.container;
    // set box position
    container.style.left = parseInt(container.style.left) + movementX + 'px';
    container.style.top = parseInt(container.style.top) + movementY + 'px';

    // update box location in storage
    updateStorage(box, 2, url);
}
