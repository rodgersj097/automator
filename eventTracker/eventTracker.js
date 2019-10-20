var arrayOfEvents = []

exports.addEvent = function(textContent, url, parentType) {

    //organize events 
    var event = new Object()
    event.textContent = textContent
    event.url = url
    event.parentType = parentType
        //add html to button type 
    event.html = addHtml(parentType)

    //add to array 
    addEventToArray(event)

}

function addHtml(parentType) {

    if (parentType = "button") {
        return '<div class="ButtonWrapper" id="draggable"><div><button class="uk-button draggableButton">Button</button></div></div>'
    } else if (parentType = "input") {
        return '<div class="wrapper"><form class="uk-search uk-search-default search"><input class="uk-search-input" type="search" placeholder="Website url" /></form></div>'
    }
}

function addEventToArray(event) {
    arrayOfEvents.push(event)
}

exports.sendArrayToFront = function(req, res) {
    req.io.emit("addingEle", { eventArray: arrayOfEvents })

}