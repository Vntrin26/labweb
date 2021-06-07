let app = require('express')(),
    server = require('http').Server(app),
    bodyParser = require('body-parser')
express = require('express'),
    cors = require('cors'),
    http = require('http'),
    path = require('path');
    const expressJwt = require('express-jwt');

let taskRoute = require('./Routes/task'),
    util = require('./Utilities/util');
let userRoute = require('./Routes/user'),
    util = require('Utilities/util');
let projectRoute = require('./Routes/project'),
    util = require('Utilities/util')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(function(err, req, res, next) {
    return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});

app.use('/task', taskRoute);
app.use('/user', userRoute);
app.use('/user', projectRoute);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next();
});
app.use('/api', expressJwt({
    secret: "secret",
    getToken: function (req, res) {
        if(!req.headers.authorization){
            return res.sendStatus(403);
        }
        else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return res.sendStatus(401);
    }
}).unless({ path: ['/users/authenticate', '/user/create-user']}));

/*first API to check if server is running*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../server/client/dist/index.html'));
})


server.listen(3000, function() {
    console.log('app listening on port: 3000');
});