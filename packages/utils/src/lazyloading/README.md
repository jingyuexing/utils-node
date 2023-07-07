## Lazyloading
If there are multiple images on the page that need to be lazy loaded to improve performance, you can use the following code

```ts
const imagesList = document.querySelectorAll("img");
const { appendElement, setCallback} = lazyLoading<HTMLImageElement|HTMLDivElement>(imagesList, (ele) => {
   console.log(ele)
});
// You can append DOM elements that need to be monitored, like the following code
// The monitored element will only be operated once,
// and will be removed from the listening list when the operation is completed
// so you don't have to worry about repeated monitoring
appendElement([...document.querySelectorAll<HTMLDivElement>(".span")])

// You can also override the callback function
// like this:

setCallback((ele)=>{
    // new callback
})

```
