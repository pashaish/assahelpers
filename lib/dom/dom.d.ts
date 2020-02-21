export declare class DOM<T extends HTMLElement> {
    private instance;
    private entry;
    constructor(entry?: Document | T | T[] | NodeListOf<T> | undefined | null, instance?: typeof HTMLElement);
    find<T1 extends HTMLElement>(selector: string, instance?: {
        new (): HTMLElement;
        prototype: HTMLElement;
    }): DOM<T1>;
    where(func: (el: HTMLElement) => boolean): DOM<T>;
    each(func: (el: HTMLElement) => void): DOM<T>;
    getNodes(): T[];
    addEventListener<T extends keyof HTMLElementEventMap>(type: T, callback: (event: HTMLElementEventMap[T]) => void): this;
}
//# sourceMappingURL=dom.d.ts.map