export const Bind = () => {
  return <T extends Function>(
    _target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    if (!descriptor || typeof descriptor.value !== "function") {
      throw new Error("Not Method");
    }
    return {
      configurable: true,
      get(this: T): T {
        const bound: T | undefined = descriptor.value?.bind(this);
        Object.defineProperty(this, key, {
          configurable: true,
          value: bound,
          writable: true
        });
        return bound!;
      }
    };
  };
};
