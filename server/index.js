var express = require("express"),
  http = require("http"),
  port = 80,
  app = require("express")(),
  server = http.createServer(app),
  bodyParser = require("body-parser"),
  io = require("socket.io")(server),
  liveCart;

console.log("HomeHub running");
console.log("Server started");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/*", function(req, res, next) {  
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");  
        res.header(
            "Access-Control-Allow-Headers",
            "Content-type,Accept,X-Access-Token,X-Key"
        );
        if (req.method == "OPTIONS") {
            res.status(200).end();
        } else {
            next();
        }
    }
);

app.get("/", function(req, res) {
  res.send(" HomeHub server listening...");
});

 app.use("/api/resources", require("./api/resources"));
// app.use("/api/macros", require("./api/macros"));
// app.use("/api/devices", require("./api/devices"));
// app.use("/api/sensors", require("./api/sensors"));

io.on("connection", function(socket) {
  socket.on("cart-transaction-complete", function() {
    socket.broadcast.emit("update-live-cart-display", {});
  });
  // on page load, show user current cart
  socket.on("live-cart-page-loaded", function() {
    socket.emit("update-live-cart-display", liveCart);
  });
  // when client connected, make client update live cart
  socket.emit("update-live-cart-display", liveCart);
  // when the cart data is updated by the POS
  socket.on("update-live-cart", function(cartData) {
    // keep track of it
    liveCart = cartData;
    // broadcast updated live cart to all websocket clients
    socket.broadcast.emit("update-live-cart-display", liveCart);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));