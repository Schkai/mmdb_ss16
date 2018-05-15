var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("datalist", ["datalist"]);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};
var mongodbUri = 'mongodb://###';




mongoose.connect(mongodbUri, options);



var datalist = new mongoose.Schema({
    order: String,
    ordernumber: Number,
    driver: String,
    time: Number,
    date: String,
    pickup: Number,
    destination: Number,
    status: String
});

var driverlist = new mongoose.Schema({
    name: String,
    driverId: Number,
    position: Number
});


var datalist = mongoose.model("datalist", datalist);
var driverlist = mongoose.model("driverlist", driverlist);



app.post("/driverlist", function(req, res){
    new driverlist({
        name: req.body.driverName,
        driverId: req.body.driverId,
        position: req.body.driverLocation
    }).save(function(err, doc){
        res.json(doc);
    });
});

app.get("/driverlist", function(req, res){
    driverlist.find({}, function(err, docs){
        res.json(docs);
    });
});



app.post("/datalist", function(req, res) {
    console.log(req.body);
    new datalist({
        order: req.body.order,
        ordernumber: req.body.ordernumber,
        driver: req.body.driver,
        time: req.body.time,
        date: req.body.date,
        pickup: req.body.pickup,
        destination: req.body.destination,
        status: req.body.status
    }).save(function(err, doc) {
        res.json(doc);
    });
});

app.get("/datalist", function(req, res) {
    datalist.find({}, function(err, docs) {
        res.json(docs);
    })
})


app.post("/datalist", function(req, res) {
    console.log(req.body);
    db.datalist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});




app.delete("/datalist/:id", function(req, res) {
    var id = req.params.id;
    datalist.findByIdAndRemove({
            _id: id
        },
        function(err, doc) {
            res.json(doc);
        });
});


app.put("/datalist/:id", function(req, res) {
    var id = req.params.id;
    console.log(req.body.order);
    datalist.findByIdAndUpdate({
        _id: id
    }, {
        order: req.body.order,
        ordernumber: req.body.ordernumber,
        driver: req.body.driver,
        time: req.body.time,
        date: req.body.date,
        pickup: req.body.pickup,
        destination: req.body.destination,
        status: req.body.status
    }, function(err, doc) {
        res.json(doc);
    });
});

app.get("datalist/:id", function(res, req) {
    var id = req.params.id;
    datalist.findById({
        _id: id
    }, function(err, doc) {
        res.json(doc);
    });
});



/*app.put("/datalist/:id", function(req, res){
    var id = req.params.id;
    console.log(req.body.order);
    db.datalist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {order: req.body.order, ordernumber: req.body.ordernumber,
        driver: req.body.driver, time: req.body.time, date: req.body.date,
        pickup: req.body.pickup, destination: req.body.destination,
        status: req.body.status}},
    new: true}, function(err, doc){
        res.json(doc);
      });
});


app.delete("/datalist/:id", function(req, res){
    var id = req.params.id;
    console.log(id);
    db.datalist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});



app.get("/datalist", function(req, res) {
    console.log("I received a GET request");
    db.datalist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});


app.get("/datalist/:id", function(req, res){
    var id = req.params.id;
    console.log(id);
    db.datalist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

*/

app.listen(process.env.PORT || 3000);
console.log("I'm running on port 3000");
