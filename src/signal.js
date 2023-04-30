"use strict";
const context = [];
function getCurrentObserver() {
    return context[context.length - 1];
}
function signal(value) {
    const subscribers = new Set();
    const read = () => {
        const current = getCurrentObserver();
        if (current)
            subscribers.add(current);
        return value;
    };
    const write = (nextValue) => {
        value = nextValue;
        for (const sub of subscribers) {
            sub();
        }
    };
    return [read, write];
}
function effect(fn) {
    const execute = () => {
        context.push(execute);
        try {
            fn();
        }
        finally {
            context.pop();
        }
    };
    execute();
}
function computed(fn) {
    const _signal = signal(null);
    effect(() => {
        _signal[1](fn());
    });
    return _signal;
}
