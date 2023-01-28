
const containerDiv = document.createElement('div');
// containerDiv.style.width = '275px';
containerDiv.style.columnCount = '1';
containerDiv.style.columnWidth = '275px';
containerDiv.style.position = 'absolute';
containerDiv.style.top = '0px';
containerDiv.style.left = '0px';
containerDiv.style.height = '1000px';
document.body.appendChild(containerDiv);

function addTextboxElement(textboxAttributes, i) {
    // create a new div element to simulate textbox
    const newDiv = document.createElement("div");
    newDiv.style.width = '275px';
    // newDiv.style.position = 'absolute';
    newDiv.style.boxSizing = 'border-box';
    newDiv.style.padding = '5px 20px 6px 10px';
    newDiv.style.borderRadius = '15px';
    newDiv.style.backgroundColor = 'rgba(80, 90, 115, 0.85)';
    newDiv.style.border = 'solid 1px lightblue';
    newDiv.style.color = 'aliceblue';
    newDiv.style.fontFamily = "Verdana, sans-serif";
    newDiv.style.fontSize = '13px';
    newDiv.boxAttributes = textboxAttributes;

    // and give it some content
    const newContent = document.createTextNode(textboxAttributes[1]);

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.style.whiteSpace = 'pre-line';
    // newDiv.style.height = newDiv.scrollHeight + 25 + 'px';

    // newDiv.style.display = 'inline-block';
    // newDiv.style.margin = '0 0 1em';
    newDiv.style.columnSpan = 'all';
    newDiv.style.marginBottom = '25px';

    // add the newly created element and its content into the DOM
    containerDiv.appendChild(newDiv);
    // newDiv.style.left = '25px';
    // newDiv.style.top = parseInt(newDiv.style.height) + 25*(i + 1) + 'px';
}

//document.addEventListener("click", (event) => {
//    if (!event.target.classList.contains("page-choice")) {
//        return;
//    }
//
//    const chosenPage = `https://${event.target.textContent}`;
//    browser.tabs.create({
//        url: chosenPage,
//    });
//});
//
// get current tab url
browser.tabs.query({currentWindow: true, active: true}).then(
        function(val) {
            // get current tab url
            let currentTab = val[0];
            // retrieve local storage
            browser.storage.local.get(null).then(
                    function(val) {
                        let currentUrlBoxes = val[currentTab.url];
                        for (let i = 0; i < currentUrlBoxes.length; i++) {
                            let currentBoxAttributes = currentUrlBoxes[i];
                            addTextboxElement(currentBoxAttributes, i)
                        }
                    },
                    function(err) {
                        console.log("ERROR", err);
                    }
            );
            // setup listener and scroll to position of clicked
            document.addEventListener('click', (event) => {
                if (event.target.type === 'textarea') {
                    let textareaX = parseInt(event.target.boxAttributes[3]);
                    let textareaY = parseInt(event.target.boxAttributes[2]);
                    const sending = browser.tabs.sendMessage(
                            currentTab.id,
                            {scrollX: textareaX, scrollY: textareaY}
                    );
                }
            });
        },
        function(err) {
            console.log("ERROR", err);
        });
















