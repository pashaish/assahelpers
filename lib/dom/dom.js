"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Bind_1 = require("../decorators/Bind");
var DOM = /** @class */ (function () {
    function DOM(entry, instance) {
        if (instance === void 0) { instance = HTMLElement; }
        this.instance = instance;
        if (entry instanceof NodeList) {
            var ents_1 = [];
            entry.forEach(function (el) {
                ents_1.push(el);
            });
            this.entry = ents_1;
        }
        else if (!entry) {
            this.entry = [document.documentElement];
        }
        else if (entry instanceof Document) {
            this.entry = [entry.documentElement];
        }
        else if (entry instanceof HTMLElement) {
            this.entry = [entry];
        }
        else {
            this.entry = entry;
        }
    }
    DOM.prototype.find = function (selector, instance) {
        if (instance === void 0) { instance = HTMLElement; }
        var elements = [];
        this.entry.forEach(function (ent) {
            var finded = ent.querySelectorAll(selector);
            finded.forEach(function (f) {
                if (f instanceof instance) {
                    elements.push(f);
                }
            });
        });
        return new DOM(elements, instance);
    };
    DOM.prototype.where = function (func) {
        var result = [];
        for (var _i = 0, _a = this.entry; _i < _a.length; _i++) {
            var ent = _a[_i];
            var dm = new DOM(ent).find("*");
            for (var _b = 0, _c = dm.entry; _b < _c.length; _b++) {
                var el = _c[_b];
                if (func(el)) {
                    result.push(ent);
                }
            }
        }
        return new DOM(result);
    };
    DOM.prototype.each = function (func) {
        for (var _i = 0, _a = this.entry; _i < _a.length; _i++) {
            var ent = _a[_i];
            func(ent);
        }
        return this;
    };
    DOM.prototype.getNodes = function () {
        return this.entry;
    };
    DOM.prototype.addEventListener = function (type, callback) {
        for (var _i = 0, _a = this.entry; _i < _a.length; _i++) {
            var ent = _a[_i];
            ent.addEventListener(type, callback);
        }
        return this;
    };
    ;
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", DOM)
    ], DOM.prototype, "find", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", DOM)
    ], DOM.prototype, "where", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", DOM)
    ], DOM.prototype, "each", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Array)
    ], DOM.prototype, "getNodes", null);
    return DOM;
}());
exports.DOM = DOM;
//# sourceMappingURL=dom.js.map