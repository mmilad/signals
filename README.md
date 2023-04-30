# signals
Little lib for createing signals and effects based on solid tutorial found [here](https://www.youtube.com/watch?v=J70HXl1KhWE).


# usage

## create signal
crate a signal which has a getter and setter method.

```
const [readFn, writeFn] = signal('hi');
readFn(); // returns 'hi'
writeFn('hello'); // returns void
readFn(); // 'hello'
```

## create effect
create an effect which will run whenever any of the used signals update.

```
const [read, write] = signal(1);

setInterval(() => {
    write(read()+1);
}, 1000);

effect(() => {
    console.log(`read value is ${read()}`);
});
```

#### Note
You can use multiple signal readers in one createEffect function.

```
const signalA = signal(1);
const signalB = signal(1);

let i = 0;
setInterval(() => {
  i++;
  signalA[1](signalA[0]() + 1);
  // increment singalB every 10th step
  if ((i / 10) >> 0) { 
    i = 0;
    signalB[1](signalB[0]() + 1);
  }
}, 1000);

effect(() => {
  console.log(
    `signalA value is ${signalA[0]()}, and signalB value is  ${signalB[0]()}`
  );
});
```

the effect function will be called whenever any signal which was inside did update.

## create computed
Create a computed signal out of any number of signals.

```
const signalA = signal(1);
const signalB = signal(1);

const computedSignal = computed(() => (signalA[0]() * signalB[0]()) * 2) 
let i = 0;
setInterval(() => {
  i++;
  signalA[1](signalA[0]() + 1);
  if ((i / 10) >> 0) {
    i = 0;
    signalB[1](signalB[0]() + 1);
  }
}, 1000);

effect(() => {
    console.log(
    `computedSignal value is ${computedSignal[0]()}`
  );
});
```

the value of computedSignal will update whenever the value of signalA or signalB changes