export class Observable<T> {
    private currentValue: T;
    private subscribers: ((value: T) => void)[] = [];

    constructor(initial: T) {
        this.currentValue = initial;
    }

    public setValue(value: T) {
        this.currentValue = value;
        this.publish();
    }

    public getValue(): T {
        return this.currentValue;
    }

    public subscribe(callback: (value: T) => void) {
        this.subscribers.push(callback);
    }

    private publish() {
        this.subscribers.forEach(s => s.call(this, this.currentValue!));
    }
}