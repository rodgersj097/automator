var socket = io.connect('http://localhost:8090');
var unacceptedEvent = ['Finalize', 'Clear', 'Load']
window.addEventListener('DOMContentLoaded', (event) => {
    console.log("Socket: Making connection")
    socket.emit('connectionSuccessful', { message: `Socket connected succesfully` });

})

function makeDraggable() {
    $('#containmentWrapper').sortable({
        placeholder: "ui-state-highlight",
        start: function(e, ui) {
            $(this).attr('data-previndex', ui.item.index())
        },
        update: function(e, ui) {
            var newIndex = ui.item.index()
            var oldIndex = $(this).attr('data-previndex')
            var array = jQuery('#containmentWrapper > .ButtonWrapper > div > ul > li > p ')
            array[oldIndex].textContent = oldIndex
            array[newIndex].textContent = newIndex
            jQuery(this).removeAttr('data-previndex');


        }
    })
    $("#containmentWrapper").disableSelection();
    $(".draggable").draggable({
        cancel: false,
        revert: true
    });
}




socket.on('GetEvents', function(data) {
    console.log(data.message)
})
var finalize = jQuery('.loaded').click(function(req, res, next) {
    jQuery.get('/load', function(response) {}).fail(function(e) {
        console.log("Error:", e)
    })

})

var clear = jQuery('.clear').click(function() {
    jQuery('#containmentWrapper').empty()
        //send event to clear array in backend
    jQuery.get('/cleared', function(res) {
        console.log(res)
    }).fail(function(e) {
        console.error("Error:", e)
    })

})

jQuery('.finalize').click(function() {


    /*   //get array 
      var array = jQuery('#containmentWrapper > .ButtonWrapper > div > ul > li >  li > button')
      jQuery.ajax({
          type: 'get',
          url: '/finalize',
          data: {
              array: array
          },
          dataType: 'json',
          success: function() {
              console.log("Success")
          },
          error: function(e) {
              console.log(e)
          },
          complete: function() {
              console.log("Complete")
          }
      }) */
})


/**
 * This listenes to all clicks on document then sends eventUrl, ButtonText and parentType to route /event in routes/index.js 
 */
var dom = document.addEventListener('click', function(e) {
        e.preventDefault()
        var parentType = e.originalTarget.localName;
        var eventUrl = e.currentTarget.activeElement.baseURI
        var targetHref = e.target.href

        var buttonText = e.currentTarget.activeElement.innerHTML

        var data = {
            eventUrl: eventUrl,
            buttonText: buttonText,
            parentType: parentType
        }

        if (buttonText !== "Finalize" && buttonText !== 'Clear' && buttonText !== 'Load') {
            jQuery.ajax({
                type: "get",
                url: "/event", //needs to be changed once the bookmark gets deployed to refelct the sites FQDN.
                data: data,
                contentType: 'application/javascript',
                success: function() {
                    console.log("Success")
                },
                error: function(e) {
                    console.log(e)
                },
                complete: function() {
                    console.log("Complete")
                }
            })
        }

        if (!targetHref == "/finalize") {
            window.location.href = targetHref
        }





    })
    /**
     * Socket is waiting for finalised event emitted from from end. Will get the eventsArray and add the elements to the front end. 
     */
socket.on("loaded", function(data) {
    console.log("received array:", data.arrayOfEvents)
    if (jQuery('#containmentWrapper').empty()) {
        data.arrayOfEvents.forEach(function(event) {
            jQuery('#containmentWrapper').append(event.html)
        })
    }
    makeDraggable()

})