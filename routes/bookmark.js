var express = require('express');
var router = express.Router();
var eventTracker = require('../eventTracker/eventTracker')
    /* GET Event page. Used for Ajax */
router.get('/', function(req, res, next) {
    let { eventUrl, buttonText, parentType } = req.query


    eventTracker.addEvent(buttonText, eventUrl, parentType)

    req.
    res.end()
});

router.get('/finalize', function(req, res, next) {
    eventTracker.sendArrayToFront()
    res.end()
})


module.exports = router;