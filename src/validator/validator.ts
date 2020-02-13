import "reflect-metadata";
import { Bind } from "../decorators/Bind";
import jss from "jss";

const classes = jss.createStyleSheet({
  errorDiv: {
    width: "fit-content",
    height: "fit-content",
    color: "brown"
  },
  errorWrapper: {
    outline: "1px solid brown",
    "border-color": "#00000000"
  }
}).attach().classes;

export type t_validationCallBack = (
  val: string,
  pushError: (str: string) => void
) => void;

export class Validator {
  private errors: string[] = [];
  private errorsDiv = (() => {
    const div = document.createElement("div");
    div.className = classes.errorDiv;
    return div;
  })();
  constructor(
    private el: HTMLInputElement,
    private validationCallBack: t_validationCallBack
  ) {}

  @Bind()
  public validate(): Validator {
    this.errors = [];
    this.validationCallBack(this.el.value, this.pushError);
    if (this.errors.length > 0) {
      this.errorFunc(this.errors, this.showError);
    } else {
      this.validFunc();
      this.errorsDiv.remove();
      this.el.classList.remove(classes.errorWrapper);
    }
    return this;
  }
  @Bind()
  public error(
    func: (errors: string[], showError: (errors: string[]) => void) => void
  ): Validator {
    this.errorFunc = func.bind(this);
    return this;
  }
  @Bind()
  public valid(func: () => void): Validator {
    this.validFunc = func.bind(this);
    return this;
  }
  @Bind()
  private pushError(error: string) {
    this.errors.push(error);
  }
  private errorFunc = (
    errors: string[],
    showError: (errors: string[]) => void
  ) => {
    showError([errors[0]]);
    return;
  };
  private validFunc = () => {
    return;
  };
  @Bind()
  private showError(errors: string[]) {
    this.errorsDiv.innerHTML = "";
    const errorDivs: HTMLDivElement[] = [];
    for (const err of errors) {
      const div = document.createElement("div");
      div.textContent = err;
      errorDivs.push(div);
    }
    errorDivs.forEach(div => {
      this.errorsDiv.append(div);
    });
    const parent = this.el.parentElement;

    if (!parent) {
      throw new Error("Parent not found");
    }
    this.el.classList.add(classes.errorWrapper);
    parent.insertBefore(this.errorsDiv, this.el.nextElementSibling);
  }
}
