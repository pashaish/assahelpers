import { Bind } from "../decorators/Bind";

export class DOM {
  private entry: HTMLElement[];
  constructor(
    entry?: Document | HTMLElement | HTMLElement[] | NodeListOf<any> | undefined
  ) {
    if (entry instanceof NodeList) {
      const ents: HTMLElement[] = [];
      entry.forEach((el) => {
        ents.push(el);
      });
      this.entry = ents;
    } else if (entry === undefined) {
      this.entry = [document.documentElement];
    } else if (entry instanceof Document) {
      this.entry = [entry.documentElement];
    } else if (entry instanceof HTMLElement) {
      this.entry = [entry];
    } else {
      this.entry = entry;
    }
  }

  @Bind()
  public find(selector: string): DOM {
    const elements: HTMLElement[] = [];
    this.entry.forEach(ent => {
      const finded = ent.querySelectorAll(selector);
      finded.forEach(f => {
        if (f instanceof HTMLElement) {
          elements.push(f);
        }
      });
    });
    return new DOM(elements);
  }
  @Bind()
  public where(func: (el: HTMLElement) => boolean) {
    const result: HTMLElement[] = [];
    for (const ent of this.entry) {
      const dm = new DOM(ent).find("*");
      for (const el of dm.entry) {
        if (func(el)) {
          result.push(ent);
        }
      }
    }
    return new DOM(result);
  }
  @Bind()
  public each(func: (el: HTMLElement) => void) {
    for (const ent of this.entry) {
      func(ent);
    }
    return this;
  }
  @Bind()
  public getNodes() {
    return this.entry;
  }
}
