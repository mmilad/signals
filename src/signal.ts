type EffectFunction = () => void;
type ComputedFunction<T> = () => T;
type Signal<T> = [() => T, (v: T) => void];

const context: EffectFunction[] = [];
function getCurrentObserver() {
  return context[context.length - 1];
}

function signal<T>(value: T): Signal<T> {
  const subscribers: Set<EffectFunction> = new Set();

  const read = (): T => {
    const current = getCurrentObserver();
    if (current) subscribers.add(current);
    return value;
  };

  const write = (nextValue: T) => {
    value = nextValue;
    for (const sub of subscribers) {
      sub();
    }
  };

  return [read, write];
}

function effect(fn: EffectFunction) {
  const execute = () => {
    context.push(execute);
    try {
      fn();
    } finally {
      context.pop();
    }
  };
  execute();
}

function computed<T>(fn: ComputedFunction<T>) {
  const _signal = signal(null as T);
  effect(() => {
    _signal[1](fn());
  });
  return _signal;
}
