## Duration

You can quickly set a predetermined date, like a week later, a day later, etc.

The specific supported time types are
|type|mean|
|:----|:--------:|
|`Y`| year|
|`M`| month |
|`w`| week |
|`d`| day |
|`h`| hour |
|`m`| minute |
|`s`| second |
|`甲子`| 60 years |


```js

duration(new Date(),"1h 40m") // This will generate a time one hour and one minute later

duration(new Date(),"1甲子") //This will generate a time 60 years from now

```
