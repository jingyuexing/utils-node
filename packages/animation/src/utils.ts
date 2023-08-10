function setStyle(target:HTMLElement,key:`${keyof CSSStyleDeclaration}`,value:string){
    target.style[key] = value;
}