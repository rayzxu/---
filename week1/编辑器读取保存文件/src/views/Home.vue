<template>
  <div>
    <button @click="openFile">打开文件</button>
    <button @click="saveFile">保存文件</button>
    <div id='container'></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'

export default {
  name: 'Home',
  data () {
    return {
      file: null,
      monacoInstence: null
    }
  },
  methods: {
    async openFile () {
      const that = this
      const reader = new FileReader()
      const [file] = await window.showOpenFilePicker()
      this.file = file
      file.getFile().then(async res => {
        console.log(new Blob([res]))
        if (res) {
          reader.readAsText(res, 'gbk')
          reader.onloadend = function () {
            that.monacoInstence = monaco.editor.create(document.getElementById('container'), {
              value: this.result,
              language: 'javascript'
            })
          }
        }
      })
    },
    async saveFile () {
      const writable = await this.file.createWritable()
      await writable.write(this.monacoInstence.getValue())
      await writable.close()
    },
    getNewFileHandle () {
      const opts = {
        types: [{
          description: 'Text file',
          accept: { 'text/plain': ['.txt'] }
        }]
      }
      return window.showSaveFilePicker(opts)
    }
  }
}
</script>

<style>
#container {
  height: 90vh
}
</style>
