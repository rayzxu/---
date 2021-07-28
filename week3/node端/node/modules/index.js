const fs = require('fs');
const exec = require('child_process').exec;

async function write (file) {
    await fs.writeFile(`./src/components/HelloWorld.vue`, file, (err) => {
        if (err) {
            console.log(err)
        }
    })
    let result = await doSCmd('webpack')
    return result
}

function doSCmd(cmd){
    let str=cmd;
    let result={};
    return new Promise(function(resolve,reject){
        exec(str,function(err,stdout,stderr){
            console.log('exec', err,stdout,stderr)
            if(err){
                console.log('err');
                result.errCode=500;
                result.data="操作失败！请重试";
                reject(result);
            }else{
                console.log('stdout ',stdout);//标准输出
                result.errCode=200;
                result.data="操作成功！";
                resolve(result);
            }
        })
    })
}

module.exports.write = async (ctx, next) => {
    console.log('query', ctx.request.body)
    const query = ctx.request.body;
    const file = query.file;
    let result = await write(file);//调用exec
    ctx.response.status=result.errCode;
    ctx.response.body=result.data;
}
