
const Koa = require('koa')
const config = require('./config/default')
const router = require('koa-router')()
const MongoDb = require('./db')
const mysql = require('./mysql')
const elasticsearchDb = require('./elasticsearch')

const redis = require("./redis")

const app = new Koa()

router.get('/mongo', async (ctx) => {
    let data = await MongoDb.query()
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
})

router.get('/mysql', async  (ctx) => {
    let data = await mysql.query()
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
})

router.get('/redis', (ctx, next) => {
    let ctx_query = ctx.query
    if (ctx_query.sessionId) {
        redis.set('sessionId', ctx_query.sessionId) // 存
    }
    ctx.body = {
        "code": 1,
        "mesg": 'success'
    }
})

router.get('elasticsearch', async (ctx) => {
    let data = await elasticsearchDb.query()
    ctx.body = {
        "code": 1,
        "mesg": 'success'
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port)

console.log(`listening on port ${config.port}`)