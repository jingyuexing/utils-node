## Lazyloading
If there are multiple images on the page that need to be lazy loaded to improve performance, you can use the following code

```ts
let imagesList = document.querySelectorAll("img")
lazyLoading(imagesList,(ele)=>{
   ele.setAttribute("src","https://random-picture.vercel.app/api?t="+Date.now())
})
```
