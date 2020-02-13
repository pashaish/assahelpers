import "reflect-metadata";
import { Bind } from "../decorators/Bind";
import jss from "jss";
import { DOM } from "../dom/dom";

const classes = jss
  .createStyleSheet({
    errorDiv: {
      width: "fit-content",
      height: "fit-content",
      color: "brown"
    },
    errorWrapper: {
      outline: "1px solid brown",
      "border-color": "#00000000"
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
        node.classList.remove(classes.errorWrapper);
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

      node.classList.add(classes.errorWrapper);
      if (_errors.length === 0) {
        node.classList.remove(classes.errorWrapper);
      }
      for (const err of _errors) {
        const div = document.createElement("div");
        div.classList.add(classes.errorDiv);
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
}
