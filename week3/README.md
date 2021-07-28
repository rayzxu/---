# node

## Project setup
```
进入前端和node端 npm安装
npm install
```

### 开启node端服务
```
node .\node\
```

### 运行前端项目
```
npm run serve
```

### 在monaco编辑器中写vue代码后点击预览 稍候片刻

### node端
在本地4000端口 启动乞丐版 koa项目
提供 /write 接口
在写入文件后执行webpack命令打amd的包
完成后通知前端require更新后的amd包
