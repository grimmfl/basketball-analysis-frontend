export class Trigger {
  private subscribers: (() => void)[] = [];

  public push() {
    this.subscribers.forEach((s) => s.call(this));
  }

  public subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }
}
