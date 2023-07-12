# Chain

Create a linked list of functions,
you can decide the condition to proceed to the next function


# Usage

```ts
const { next, invoke, onError } = chain();
let s = 1;
next(() => {
 console.log('S is:', s); //will be output S is: 1
 s++;
 console.log('S is:', s); //will be output S is: 2
});
next(() => {
 s++;
 console.log('S is:', s); //will be output S is: 3
});
next(() => {
 s++;
 console.log('S is:', s); //will be output S is: 4
})
invoke();
```
