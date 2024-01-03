export function useSocket(url:`${"ws"|"wss"|"http"|"https"}://${string}`){
   const _ws = new WebSocket(url)
   let _open = (ev:Event)=>{}
   let _message = <T>(ev:MessageEvent<T>)=>{}
   let _error = (ev:Event)=>{}
   let _close = (ev:Event)=>{}
   const setOpen = (cb:typeof _open)=>{
      _open = cb
   }
   const setMessage = (cb:typeof _message)=>{
      _message = cb
   }
   const setError = (cb:typeof _open)=>{
      _error = cb
   }
   const setClose = (cb:typeof _open)=>{
      _close = cb
   }
   const getContext=()=>{
      return _ws
   }
   _ws.addEventListener("open",_open)
   _ws.addEventListener("message",_message)
   _ws.addEventListener("error",_error)
   _ws.addEventListener("close",_close)
   return {
      open:setOpen,
      error:setError,
      message:setMessage,
      close:setClose,
      getContext
   }
}

const { open, error, message, getContext } = useSocket("ws://www.b.c")

open((e)=>{
})

interface IMessage{
   user:{},
   content:string
}

message(<IMessage>(e:MessageEvent<IMessage>)=>{
   const _data = e.data
})
