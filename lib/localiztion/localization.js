"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Localization = /** @class */ (function () {
    function Localization(currentLocale) {
        this.currentLocale = currentLocale;
        this.locales = new Map();
    }
    ;
    Localization.prototype.set = function (lang, lObj) {
        this.locales.set(lang, lObj);
    };
    ;
    Localization.prototype.get = function (key, lang) {
        if (lang === void 0) { lang = this.currentLocale; }
        var locale = this.locales.get(lang);
        if (locale) {
            var translated = locale.get(key);
            if (translated) {
                return translated;
            }
        }
        return key;
    };
    return Localization;
}());
exports.Localization = Localization;
//# sourceMappingURL=localization.js.map