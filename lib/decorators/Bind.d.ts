export declare const Bind: () => <T extends Function>(_target: object, key: string, descriptor: TypedPropertyDescriptor<T>) => {
    configurable: boolean;
    get(this: T): T;
};
//# sourceMappingURL=Bind.d.ts.map