var jsonServer = require('json-server');
var server = jsonServer.create();
var dbData = require('./db.json');
var router = jsonServer.router(dbData);
var middlewares = jsonServer.defaults();
var bodyParser = require('body-parser');

/**
 * MIDDLEWARES (logger, static, cors and no-cache)
 */

server.use(middlewares);
server.use(bodyParser.json({ type: 'application/*+json' }));

/**
 * ROUTE RE-WRITES
 * like https://github.com/typicode/json-server#rewriter-example
 */


/**
 * CUSTOM ROUTES
 * like https://github.com/typicode/json-server#custom-routes-example
 */

server.use('/users/:id/roles/:name', function (req, res) {
    res.send(200, null);
});

/**
 * DEFAULT ROUTER
 */

var port = 9004;
server.use(router);
server.listen(port, function () {
    console.log('JSON Server is running on port', port);
});
