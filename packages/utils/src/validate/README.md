# validate

```ts
const { values } = validate({
    name:"min=3;max=6",
    with:"oneof=A,B,C,D,E,F"
})
values.name = "A" // The value of the field will not be assigned
values.name = "Angle" // the name is "Angle"
```


| rule     |                                                                              mean                                                                               |
|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `min`    | If the value is a string, compare whether the length is within the minimum value; if it is a number, compare whether the size of the number is within the range |
| `max`    | If the value is a string, compare whether the length is within the maximum value; if it is a number, compare whether the size of the number is within the range |
| `gt`     |                                                              the must be great than specify value                                                               |
| `lt`     |                                                               the must be less than specify value                                                               |
| `gte`    |                                                          the must be great than or equal specify value                                                          |
| `lte`    |                                                          the must be less than or equal specify value                                                           |
| `oneof`  |                                                             value must be one of the listed values                                                              |
| `is`     |                                       The value must conform to the validation rules,(like base64,email,eth address .etc)                                       |
| `number` |                                                                   the value must be a number                                                                    |
| `array`  |                                                                    this value must be array                                                                     |
