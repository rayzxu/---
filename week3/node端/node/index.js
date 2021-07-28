const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser');
const { write } = require('./modules')

let port = 4000;
console.log(`App running at:
- Local:   http://localhost:4000`)

const app = new koa();
app.use(bodyParser());

app.use(
    mount('/write', write)
)

app.use(
    mount('/bundle', function (ctx) {
        ctx.body = fs.readFileSync(__dirname + '/dist/bundle.js', 'utf-8')
    })
)

app.listen(port);
