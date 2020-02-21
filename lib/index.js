"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("./validator/validator");
var validators_1 = require("./validator/validators");
var dom_1 = require("./dom/dom");
(function () {
    var inputs = new dom_1.DOM().find(".input", HTMLInputElement);
    var validatorUsername = new validator_1.Validator(inputs, validators_1.usernameValidator);
    validatorUsername.onValid = function () {
        console.debug(1);
    };
    validatorUsername.onError = function () {
        console.debug(0);
    };
    inputs.addEventListener("input", validatorUsername.validate);
    setTimeout(function () {
        var dm = new dom_1.DOM(document.documentElement, HTMLIFrameElement);
        var finded = dm
            .find(".group")
            .where(function (e) { return e.classList.contains("item-2") || e.classList.contains("item-4"); })
            .each(function (e) {
            e.textContent = "FINDED";
        });
        console.debug(finded.getNodes());
        console.debug(new dom_1.DOM().find("input"));
    }, 500);
})();
//# sourceMappingURL=index.js.map