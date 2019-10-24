var express = require('express');
var router = express.Router();
var eventTracker = require('../eventTracker/eventTracker')
    /* GET home page. */
router.get('/', function(req, res, next) {
    var io = req.app.get('socketio')

    io.of('/finalize').on('connection', function(data) {
        io.emit('GetEvents', { message: `e` })
    })
    io.on('connectionSuccessful', function(data) {
        console.log(data.message)
    })
    io.on('clearArray', function() { eventTracker.clearArray() })
    res.render('index', { title: 'Express' });

});

router.get('/load', function(req, res, next) {
    var io = req.app.get('socketio')
        //sending array
    arrayOfEvents = eventTracker.sendArrayToFront()
    io.emit('loaded', { message: `Sending Events to front`, arrayOfEvents: arrayOfEvents })
    res.end()
})

router.get('/cleared', (req, res, next) => {
    eventTracker.clearArray()
    res.end()
})

/**
 * 
 */

module.exports = router;