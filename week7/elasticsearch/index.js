const es_client = require('./module')

class elasticsearchDb {
    constructor() {

    }
    query() {
        return new Promise((resolve, reject) => {
            es_client.search({
                index: 'myindex',
                type: 'mytype',
                body: {
                    query: {
                        "terms": {
                            "_id": ["6"]
                        }
                    }
                }
            }, function (error, response) {
                resolve(response.hits.hits)
            })
        })
    }
}

module.exports = new elasticsearchDb()