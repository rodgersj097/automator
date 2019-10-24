var arrayOfEvents = []
var acceptedEvents = ['button', 'input', 'a']


exports.addEvent = function(textContent, url, parentType) {
    //organize events 
    var event = new Object()
    event.textContent = textContent
    event.url = url
    event.parentType = parentType

    //add to array 
    var events = addEventToArray(event)
    events.forEach((event, i) => {
        event.html = addHtml(event.textContent, i)
    })
}

function addHtml(textContent, i) {

    if (parentType = "button") {
        return `<li class="ButtonWrapper" id="draggable">
        <div id="background">
            <ul class="uk-list">
                <li>
                    <p>${i }</p>
                </li>
                <li> <button class="uk-button draggableButton buttonTextContent">${textContent}</button></li>
            </ul>
        </div>
    </li>`
    } else if (parentType = "input") {
        return `<div class="wrapper"><form class="uk-search uk-search-default search"><input class="uk-search-input" type="search" placeholder="Website url" /></form></div>`
    }
}

function addEventToArray(event) {
    arrayOfEvents.push(event)
    return arrayOfEvents
}

exports.sendArrayToFront = function(req, res) {
    console.log('sending events')

    return arrayOfEvents
}

exports.clearArray = function(req, res) {
    arrayOfEvents = []
    console.log("array Cleared")
}