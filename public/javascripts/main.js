var socket = io.connect('http://localhost:8090');


var dom = document.addEventListener('click', function(e) {
    e.preventDefault()
    var parentType = e.currentTarget.activeElement.localname;
    var eventUrl = e.currentTarget.activeElement.baseURI
    var targetHref = e.target.href
    console.log(e)
    var buttonText = e.currentTarget.activeElement.innerHTML
    console.log(buttonText)
    var data = {
        eventUrl: eventUrl,
        buttonText: buttonText,
        parentType: parentType
    }
    if (buttonText != "Finalize") {
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
    if (targetHref = "/finalize") {
        socket.on("addingEle", function(eventArray)
        {
               eventArray.forEach(function(event){ 
                   jQuery('#arrayHook').append(event.html)
               })

                
        })  
            
    
}

}) 