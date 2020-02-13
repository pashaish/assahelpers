import { Bind } from "../decorators/Bind";

export class DOM<T extends HTMLElement> {
  private entry: T[];
  constructor(
    entry?: Document | T | T[] | NodeListOf<T> | undefined | null,
    private instance: any = HTMLElement
  ) {
    if (entry instanceof NodeList) {
      const ents: T[] = [];
      entry.forEach((el) => {
        ents.push(el);
      });
      this.entry = ents;
    } else if (!entry) {
      this.entry = [document.documentElement as T];
    } else if (entry instanceof Document) {
      this.entry = [entry.documentElement as T];
    } else if (entry instanceof HTMLElement) {
      this.entry = [entry];
    } else {
      this.entry = entry;
    }
  }

  @Bind()
  public find<T1 extends HTMLElement>(selector: string, instance = HTMLElement): DOM<T1> {
    const elements: T1[] = [];
    this.entry.forEach(ent => {
      const finded = ent.querySelectorAll(selector);
      finded.forEach(f => {
        if (f instanceof instance) {
          elements.push(f as T1);
        }
      });
    });
    return new DOM<T1>(elements, instance);
  }
  @Bind()
  public where(func: (el: HTMLElement) => boolean): DOM<T> {
    const result: T[] = [];
    for (const ent of this.entry) {
      const dm = new DOM(ent).find("*");
      for (const el of dm.entry) {
        if (func(el)) {
          result.push(ent);
        }
      }
    }
    return new DOM<T>(result);
  }
  @Bind()
  public each(func: (el: HTMLElement) => void): DOM<T> {
    for (const ent of this.entry) {
      func(ent);
    }
    return this;
  }
  @Bind()
  public getNodes(): T[] {
    return this.entry;
  }

  public addEventListener<T extends keyof HTMLElementEventMap>(type: T, callback: (event: HTMLElementEventMap[T]) => void) {
    for (const ent of this.entry) {
      console.debug(ent);
      ent.addEventListener(type, callback)
    }
    return this;
  };
}
