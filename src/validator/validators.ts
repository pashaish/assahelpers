import { t_validationCallBack } from "./validator";
import { Localization } from "../localiztion/localization";

const createLocale = () => {
  type t_localeStrings =
    | "The value must contain more than 5 characters"
    | "The value must contain the Latin alphabet"
    | "Not valid data"
    | "Not valid email"
    | "The value must not contain spaces";
  type t_locales = "en" | "ru";
  const lang = document.documentElement.lang;
  const locale = new Localization<t_locales, t_localeStrings>(
    lang === "ru" || lang === "en" ? lang : "en"
  );
  const rus = new Map<t_localeStrings, string>();
  rus.set(
    "The value must contain more than 5 characters",
    "Поле должно содержать больше 5 символов"
  );
  rus.set(
    "The value must contain the Latin alphabet",
    "Поле должно содержать латиницу"
  );
  rus.set(
    "The value must not contain spaces",
    "Значение не должно содержать пробелы"
  );
  rus.set(
    "Not valid data",
    "Не верный формат данных"
  );
  rus.set(
    "Not valid email",
    "Не верный формат почты"
  );
  locale.set("ru", rus);
  return locale;
};

const locale = createLocale();

export const usernameValidator: t_validationCallBack = (val, push) => {
  if (val.length === 0) {
    push("");
    return;
  }
  if (val.length < 5) {
    push(locale.get("The value must contain more than 5 characters"));
    return;
  }
  if (!!val.toLowerCase().match(/[а-я]/)) {
    push(locale.get("The value must contain the Latin alphabet"));
    return;
  }
  if (!!val.match(/\s/)) {
    push(locale.get("The value must not contain spaces"));
    return;
  }
  if (!val.match(/^[a-z0-9_-]{3,16}$/)) {
    push(locale.get("Not valid data"));
    return;
  }
};

export const emailValidator: t_validationCallBack = (val, push) => {
  if (val.length === 0) {
    push("");
    return;
  }
  const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!val.match(regexpEmail)) {
    push(locale.get("Not valid email"));
  }
}