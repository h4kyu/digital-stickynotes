
function addTextboxElement(textboxAttributes, i) {
    // create a new div element to simulate textbox
    const newDiv = document.createElement("textarea");
    newDiv.type = 'text';
    newDiv.style.resize = 'none';
    newDiv.readOnly = true;
    newDiv.style.height = '100px';
    newDiv.style.width = '350px';
    newDiv.style.position = 'absolute';
    newDiv.style.boxSizing = 'border-box';
    newDiv.style.padding = '5px 20px';
    newDiv.style.borderRadius = '7px';
    newDiv.style.backgroundColor = 'rgba(110, 120, 150, 0.95)';
    newDiv.style.border = 'solid 1px lightblue';
    newDiv.style.color = 'aliceblue';
    newDiv.style.fontFamily = "Courier New, monospace";
    newDiv.style.fontSize = '13px';
    newDiv.boxAttributes = textboxAttributes;

    // and give it some content
    const newContent = document.createTextNode(textboxAttributes[1]);

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM
    document.body.append(newDiv);
    newDiv.style.left = '25px';
    newDiv.style.top = 100*i + 25*(i + 1) + 'px';
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
















