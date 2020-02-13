
export class Localization<L extends string = ("en" | "ru"), K extends string = ""> {
  constructor(private currentLocale: L) {};
  private locales = new Map<L, Map<K, string>>();
  
  public set(lang: L, lObj: Map<K, string>) {
    this.locales.set(lang, lObj);
  };
  public get(key: K, lang: L = this.currentLocale) {
    const locale = this.locales.get(lang);
    if (locale) {
      const translated = locale.get(key);
      if (translated) {
        return translated;
      }
    }
    return key;
  }
}
