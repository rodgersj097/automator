var express = require('express');
var router = express.Router();
var eventTracker = require('../eventTracker/eventTracker')
var acceptedEvents = ['button', 'input', 'a']

router.get('/', function(req, res, next) {
    let { eventUrl, buttonText, parentType } = req.query
    console.log(parentType)
    if (acceptedEvents.includes(parentType)) {
        console.log("Event matched AcceptedEvents, Adding event")
        eventTracker.addEvent(buttonText, eventUrl, parentType)
        res.end()
    }

    res.end()
});


module.exports = router;