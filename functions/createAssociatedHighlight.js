// create box around general area of user selection (top left corner to bottom right corner)
function createAssociatedHighlight(textbox, firstRange, lastRange) {
    let posFirstRange = getCoords(firstRange);
    let posLastRange = getCoords(lastRange);
    // get coordinates for box placement
    let top = posFirstRange.top;
    let left = posFirstRange.left;
    let width = Math.max(posFirstRange.width, posLastRange.width);
    let height = posLastRange.bottom - posFirstRange.clientTop;
    // create the overlapping box
    let highlightBox = document.createElement('div');
    document.body.appendChild(highlightBox);
    highlightBox.style.position = 'absolute';
    highlightBox.style.zIndex = 999; // keep under textbox objects
    highlightBox.style.backgroundColor = 'rgba(120, 120, 190, 0.5)';
    highlightBox.style.left = left + 'px';
    highlightBox.style.top = top + 'px';
    highlightBox.style.height = height + 'px';
    highlightBox.style.width = width + 'px';
    highlightBox.style.borderRadius = '7px';
    textbox.associatedHighlight = highlightBox; // update textbox's associatedHighlight
}