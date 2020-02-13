import { Validator } from "./validator/validator";
import { usernameValidator, emailValidator } from "./validator/validators";
import { DOM } from "./dom/dom";

(() => {
  const username = document.querySelector("#input-1");
  const email = document.querySelector("#input-2");

  if (!(username instanceof HTMLInputElement)) {
    throw new Error("Input username not found");
  }
  if (!(email instanceof HTMLInputElement)) {
    throw new Error("Input email not found");
  }

  const validatorUsername = new Validator(username, usernameValidator);
  const validatorEmail = new Validator(email, emailValidator);

  username.addEventListener("input", event => {
    validatorUsername.validate();
  });
  email.addEventListener("input", event => {
    validatorEmail.validate();
  });

  setTimeout(() => {
    const dm = new DOM();
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
  }, 2500);
})();
