type FullScreenReturns = {
    toggle: () => void,
    setTarget: (ele: Element) => void,
    error: (cb: (e: Error) => void) => void
}
export function useFullScreen(): FullScreenReturns {
    let _switch = false
    let _targetDOM: Element = document.body;
    let _errorHandler: (e: Error) => void
    const intoFull = (options?: FullscreenOptions) => {
        if (_switch && !document.fullscreenElement) {
            _targetDOM.requestFullscreen(options).catch((reason) => {
                _errorHandler(reason)
            })
        }
    }
    const toggle = (options?: FullscreenOptions) => {
        _switch = !_switch
        intoFull(options)
    }
    const error = (cb: (e: Error) => void) => {
        _errorHandler = cb
    }
    const setTarget = (ele: Element = document.body) => {
        _targetDOM = ele
    }
    return {
        toggle,
        setTarget,
        error,
    }
}