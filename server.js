// JSON Server module

const jsonServer = require("json-server");
const server = jsonServer.createServer();
const router = jsonServer.router(require("../../server.json"));
 
// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
// Add custom route here if needed
    jsonServer.rewriter({
    "/*": "/$1",
    })
);
server.use(router);
// Listen to port
server.listem(3333, () => {
    console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;