export function useGamepad() {
   if (typeof navigator.getGamepads === "undefined") {
      throw new Error("your browser can't support gamepad")
   }
   interface GamePadObject {
      gamepadList: (GamepadEvent['gamepad'] | null)[]
      turbo: boolean
      connected: ((gamepad: GamepadEvent['gamepad'] | null) => void) | null,
      disconnected: ((gamepad: GamepadEvent['gamepad'] | null,turbo?:boolean,index?:number) => void) | null
      onPress: ((button: GamepadButton, index?: number) => void) | null
      update:(()=>void) | null
   }
   const gamepadObject: GamePadObject = {
      gamepadList: [] as (Gamepad | null)[],
      disconnected: null,
      turbo: false,
      connected: null,
      onPress: null,
      update:null
   }
   let gamepadIndex = 0
   let loopId = 0
   const setOnConnected = (cb: ((gamepad: GamepadEvent['gamepad'] | null) => void | null)) => {
      gamepadObject.connected = cb;
   }
   const onButtonPress = (cb: (button: GamepadButton, index?: number) => void) => {
      gamepadObject.onPress = cb
   }
   const onDisConnected = (cb: (gamepad: Gamepad|null, turbo?:boolean,index?: number) => void)=>{
      gamepadObject.disconnected = cb
   }
   const setUpdate = (cb:()=>void)=>{
      gamepadObject.update = cb;
   }
   window.addEventListener("gamepadconnected", (gamepad) => {
      gamepadObject.gamepadList = navigator.getGamepads()
      if (gamepadObject.connected) {
         gamepadObject.turbo = true
         gamepadObject.connected(gamepad.gamepad)
         loopId = requestAnimationFrame(scanPressedButton)
      }
      gamepadIndex = gamepad.gamepad.index
   })

   window.addEventListener("gamepaddisconnected", (gamepad) => {
      gamepadObject.turbo = false
      if (gamepadObject.disconnected) {
         gamepadObject.disconnected(gamepad.gamepad,gamepadObject.turbo)
      }
      stopLoop()
   })
   function getGamepads() {
      return gamepadObject.gamepadList[gamepadIndex]
   }
   const scanPressedButton = () => {
      const gamepad = getGamepads();
      if (gamepad) {
         for (let i = 0; i < gamepad.buttons.length; i++) {
            if ((gamepad.buttons[i].pressed || gamepad.buttons[i].touched) && gamepadObject.onPress) {
               gamepadObject.onPress(gamepad.buttons[i], i)
            }
         }
      }
      loopId = requestAnimationFrame(scanPressedButton)
   }
   const stopLoop = ()=>{
      cancelAnimationFrame(loopId)
   }
   return {
      gamepads: gamepadObject.gamepadList,
      index: gamepadIndex,
      getGamepads,
      setOnConnected,
      setOnDisconnected:onDisConnected,
      onButtonPress,
      turbo: gamepadObject.turbo,
      setUpdate,
      stopLoop
   }
}
