<template>
  <div>
    <!-- <button @click="openFile">打开文件</button>
    <button @click="saveFile">保存文件</button> -->
    <button @click="write">预览</button>
    <button style="display: none" @click="preview">preview</button>
    <div class="monaco-container">
      <div id='container'></div>
      <div id="preview-container">
        <div id="preview"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { preview } from '@/api'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'

export default {
  name: 'Home',
  data () {
    return {
      file: null,
      monacoInstence: null
    }
  },
  mounted () {
    this.monacoInstence = monaco.editor.create(document.getElementById('container'), {
      value: `<template>
    <div>
        hello world
    </div>
</template>`,
      language: 'javascript'
    })
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
    write () {
      let elContainer = document.getElementById('preview-container')
      elContainer.innerHTML = '<div id="preview">正在加载。。 请稍后</div>'
      delete require.cache[require.resolve('../../../node端/node/dist/bundle.js')]; 
      preview({file: this.monacoInstence.getValue()}).then(res => {
        console.log(res)
        this.preview()
      })
    },
    preview () {
      let name = 'bundle.js'
      require([`../../../node端/node/dist/${name}`], function() {
        console.log('do nothing')
      })
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
.monaco-container {
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#container {
  height: 90vh;
  width: 50vw;
}
#preview-container {
  height: 90vh;
  width: 50vw;
}
</style>
