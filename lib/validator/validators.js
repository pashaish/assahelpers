"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localization_1 = require("../localiztion/localization");
var createLocale = function () {
    var lang = document.documentElement.lang;
    var locale = new localization_1.Localization(lang === "ru" || lang === "en" ? lang : "en");
    var rus = new Map();
    rus.set("The value must contain more than 5 characters", "Поле должно содержать больше 5 символов");
    rus.set("The value must contain the Latin alphabet", "Поле должно содержать латиницу");
    rus.set("The value must not contain spaces", "Значение не должно содержать пробелы");
    rus.set("Not valid data", "Не верный формат данных");
    rus.set("Not valid email", "Не верный формат почты");
    locale.set("ru", rus);
    return locale;
};
var locale = createLocale();
exports.usernameValidator = function (val, push) {
    if (val.length === 0) {
        push("");
        return;
    }
    if (val.length < 5) {
        push(locale.get("The value must contain more than 5 characters"));
    }
    if (!!val.toLowerCase().match(/[а-я]/)) {
        push(locale.get("The value must contain the Latin alphabet"));
    }
    if (!!val.match(/\s/)) {
        push(locale.get("The value must not contain spaces"));
    }
};
exports.emailValidator = function (val, push) {
    if (val.length === 0) {
        push("");
        return;
    }
    var regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!val.match(regexpEmail)) {
        push(locale.get("Not valid email"));
    }
};
//# sourceMappingURL=validators.js.map