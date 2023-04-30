type EffectFunction = () => void;
type Signal<T> = [
  () => T,
  (v:T) => void
]

const context: EffectFunction[] = [];

function getCurrentObserver() {
  return context[context.length - 1];
}

function createEffect(fn: EffectFunction) {
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

function createSignal<T>(value: T): Signal<T> {
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
