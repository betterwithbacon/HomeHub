var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var async = require("async");
app.use(bodyParser.json());
module.exports = app;

var resourceDB = new Datastore({
  filename: "./databases/resources.db",
  autoload: true
});

// GET ALL resources
app.get("/", function(req, res) {
  resourceDB.find({}, function(err, records) {
    console.log("sending all resources");
    res.send(records);
  });
});

// GET
app.get("/:resourceId", function(req, res) {
  if (!req.params.resourceId) {
    res.status(500).send("ID field is required.");
  } else {
    resourceDB.findOne({ _id: req.params.resourceId }, function(err, resource) {
      res.send(resource);
    });
  }
});

// POST
app.post("/", function(req, res) {
  var newresource = req.body;
  resourceDB.insert(newresource, function(err, resource) {
    if (err) res.status(500).send(err);
    else res.send(resource);
  });
});

// DELETE
app.delete("/:resourceId", function(req, res) {
  resourceDB.remove({ _id: req.params.resourceId }, function(err, numRemoved) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT
app.put("/", function(req, res) {
  var resourceId = req.body._id;
  resourceDB.update({ _id: resourceId }, req.body, {}, function(err,numReplaced,resource) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// app.decrementInventory = function(resources) {
//   async.eachSeries(resources, function(transactionresource, callback) {
//     resourceDB.findOne({ _id: transactionresource._id }, function(
//       err,
//       resource
//     ) {      
//       if (!resource || !resource.quantity_on_hand) {
//         callback();
//       } else {
//         var updatedQuantity =
//           parseInt(resource.quantity_on_hand) -
//           parseInt(transactionresource.quantity);
//         resourceDB.update(
//           { _id: resource._id },
//           { $set: { quantity_on_hand: updatedQuantity } },
//           {},
//           callback
//         );
//       }
//     });
//   });
// };