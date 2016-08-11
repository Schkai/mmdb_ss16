var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("datalist", ["datalist"]);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
var mongodbUri = 'mongodb://Konstantin:konstantin@ds029585.mlab.com:29585/mmdb16';




mongoose.connect(mongodbUri, options);



var datalist = new mongoose.Schema({
    order: String,
    ordernumber: Number,
    driver: String,
    time: Number,
    date: Number,
    pickup: Number,
    destination: Number,
    status: String
});

var datalist = mongoose.model("datalist", datalist);


app.post("/datalist", function(req, res){
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
    }).save(function(err, doc){
        res.json(doc);
    });
});

app.get("/datalist", function(req, res){
    datalist.find({}, function(err, docs){
        res.json(docs);
    })
})




app.get("/datalist", function(req, res) {
    console.log("I received a GET request");
    db.datalist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post("/datalist", function(req, res){
    console.log(req.body);
    db.datalist.insert(req.body, function(err, doc){
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


app.get("/datalist/:id", function(req, res){
    var id = req.params.id;
    console.log(id);
    db.datalist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.delete("/datalist/:id", function(req, res){
    var id = req.params.id;
    user.findByIdAndRemove({_id: id},
    function(err, docs){
        res.json(doc);
    });
});


app.put("/datalist/:id", function(req, res){
    var id = req.params.id;
    console.log(req.body.order);
    datalist.findByIdAndUpdate({_id: id},
    {
        order: req.body.order,
        ordernumber: req.body.ordernumber,
        driver: req.body.driver,
        time: req.body.time,
        date: req.body.date,
        pickup: req.body.pickup,
        destination: req.body.destination,
        status: req.body.status
    }, function(err, doc){
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

*/

app.listen(3000);
console.log("Server running on port 3000");
