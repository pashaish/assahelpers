import { Validator } from "./validator/validator";
import { usernameValidator } from "./validator/validators";
import { DOM } from "./dom/dom";

(() => {
  const inputs = new DOM().find<HTMLInputElement>(
    ".input",
    HTMLInputElement
  );
  const validatorUsername = new Validator(inputs, usernameValidator);

  validatorUsername.onValid = () => {
    console.debug(1);
  };
  validatorUsername.onError = () => {
    console.debug(0);
  };

  inputs.addEventListener("input", validatorUsername.validate);


  setTimeout(() => {
    const dm = new DOM(document.documentElement, HTMLIFrameElement);
    const finded = dm
      .find(".group")
      .where(
        e => e.classList.contains("item-2") || e.classList.contains("item-4")
      )
      .each(e => {
        e.textContent = "FINDED";
      });
    console.debug(finded.getNodes());
    console.debug(new DOM().find("input"));
  }, 500);
})();
