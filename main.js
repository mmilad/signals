const signalA = signal(1);
const signalB = signal(1);

const computedSignal = computed(() => signalA[0]() * signalB[0]()) 
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
