# signals
Little lib for createing signals and effects based on solid tutorial found [here](https://www.youtube.com/watch?v=J70HXl1KhWE).


# usage

```
const [read, write] = createSignal(1);

setInterval(() => {
    write(read()+1);
}, 1000);

createEffect(() => {
    console.log(`read value is ${read()}`)
})
```

# description
When reading a signal within a createEffect context, the read method will add the function wich was passed the createEffect function and execute it whenever the write function of the signal is called.
Note that you can use multiple signal readers in one createEffect function.