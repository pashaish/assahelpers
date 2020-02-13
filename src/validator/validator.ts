import "reflect-metadata";
import { Bind } from "../decorators/Bind";
import jss from "jss";
import { DOM } from "../dom/dom";

const classes = jss
  .createStyleSheet({
    warningText: {
      width: "fit-content",
      height: "fit-content",
    },
    border: {
      "box-shadow": "inset 0 0 2px 0px brown",
    },
    hide: {
      display: "none",
    },
    warningWrapper: {
      position: "absolute",
      padding: "2px",
      "border": "1px solid brown",
      "background-color": "whitesmoke",
      color: "brown",
      "font-family": "monospace",
    }
  })
  .attach().classes;

export type t_validationCallBack = (
  val: string,
  pushError: (str: string) => void
) => void;

export class Validator {
  private errors: Map<HTMLInputElement, string[]> = new Map();
  private errorsDiv: Map<HTMLInputElement, HTMLDivElement> = new Map();

  constructor(
    private el: DOM<HTMLInputElement>,
    private validationCallBack: t_validationCallBack
  ) {
    for (const node of el.getNodes()) {
      this.errorsDiv.set(
        node,
        (() => {
          const div = document.createElement("div");
          const nodePos = (() => {
            node.style.position = "relative";
            const pos = {
              x: node.offsetLeft + node.offsetWidth,
              y: node.offsetTop,
            }
            node.style.position = "initial";
            return pos;
          })()
          div.style.top = `${nodePos.y}px`;
          div.style.left = `${nodePos.x}px`;
          div.classList.add(classes.warningWrapper)
          return div;
        })()
      );
      this.errorFunc.set(node, (errors, showError) => {
        showError(errors);
      });
      this.validFunc.set(node, () => {
        return;
      });
    }
    this.setListeners();
  }

  @Bind()
  public validate(): Validator {
    for (const node of this.el.getNodes()) {
      this.errors.set(node, []);
      this.validationCallBack(node.value, this.pushError(node));
      if (this.errors.get(node)!.length > 0) {
        this.errorFunc.get(node)!(this.errors, this.showError);
      } else {
        this.validFunc.get(node)!();
        node.classList.remove(classes.border);
        this.errorsDiv.get(node)!.remove();
      }
    }
    return this;
  }
  @Bind()
  public error(
    func: (errors: Map<HTMLInputElement, string[]>, showError: (errors: Map<HTMLInputElement, string[]>) => void) => void
  ): Validator {
    for (const node of this.el.getNodes()) {
      this.errorFunc.set(node, func.bind(this));
    }
    return this;
  }
  @Bind()
  public valid(func: () => void): Validator {
    for (const node of this.el.getNodes()) {
      this.validFunc.set(node, func.bind(this));
    }
    return this;
  }
  @Bind()
  private pushError(node: HTMLInputElement) {
    return (error: string) => {
      this.errors.get(node)!.push(error);
    };
  }
  private errorFunc = new Map<
    HTMLInputElement,
    (
      errors: Map<HTMLInputElement, string[]>,
      showError: (errors: Map<HTMLInputElement, string[]>) => void
    ) => void
  >();
  private validFunc = new Map<HTMLInputElement, Function>();
  @Bind()
  private showError(errors: Map<HTMLInputElement, string[]>) {
    for (const node of this.el.getNodes()) {
      this.errorsDiv.get(node)!.innerHTML = "";
      const errorDivs: HTMLDivElement[] = [];
      const _errors = errors.get(node);
      if (!_errors) {
        return;
      }

      node.classList.add(classes.border);
      if (_errors.length === 0) {
        node.classList.remove(classes.border);
      }
      for (const err of _errors) {
        const div = document.createElement("div");
        div.classList.add(classes.warningText);
        div.textContent = err;
        errorDivs.push(div);
      }
      errorDivs.forEach(div => {
        this.errorsDiv.get(node)!.append(div);
      });
      const parent = node.parentElement;

      if (!parent) {
        throw new Error("Parent not found");
      }
      parent.insertBefore(this.errorsDiv.get(node)!, node.nextElementSibling);
    }
  }

  @Bind()
  private setListeners() {
    for (const node of this.el.getNodes()) {
      node.addEventListener("focus", (ev) => {
          this.errorsDiv.get(node)!.classList.remove(classes.hide);
      });
      node.addEventListener("blur", (ev) => {
        this.errorsDiv.get(node)!.classList.add(classes.hide);
      });
    }
  }
}
