export async function wasm(file: RequestInfo | URL) {
   const _exports_ = {
      imports:{},
      exports:{}
   }
   await fetch(file).then((res) => {
      WebAssembly.instantiateStreaming(res).then((source) => {
         _exports_.exports = source.instance.exports
      })
   })
   return _exports_
}
