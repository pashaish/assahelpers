export declare class Localization<L extends string = ("en" | "ru"), K extends string = ""> {
    private currentLocale;
    constructor(currentLocale: L);
    private locales;
    set(lang: L, lObj: Map<K, string>): void;
    get(key: K, lang?: L): string;
}
//# sourceMappingURL=localization.d.ts.map