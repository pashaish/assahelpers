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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Bind_1 = require("../decorators/Bind");
var jss_1 = __importDefault(require("jss"));
var classes = jss_1.default
    .createStyleSheet({
    warningText: {
        width: "fit-content",
        height: "fit-content",
        margin: "1px",
    },
    border: {
        "box-shadow": "inset 0 0 2px 0px brown",
    },
    hide: {
        display: "none",
    },
    warningWrapper: {
        position: "absolute",
        padding: "1px",
        "border": "1px solid brown",
        "background-color": "whitesmoke",
        color: "brown",
        "font-family": "monospace",
        width: "fit-content",
        "text-align": "left",
    }
})
    .attach().classes;
var Validator = /** @class */ (function () {
    function Validator(el, validationCallBack) {
        this.el = el;
        this.validationCallBack = validationCallBack;
        this.errors = new Map();
        this.errorsDiv = new Map();
        this.onError = function () { return; };
        this.onValid = function () { return; };
        this.errorFunc = new Map();
        this.validFunc = new Map();
        var _loop_1 = function (node) {
            this_1.errorsDiv.set(node, (function () {
                var div = document.createElement("div");
                var nodePos = (function () {
                    node.style.position = "relative";
                    var pos = {
                        x: node.offsetLeft + node.offsetWidth,
                        y: node.offsetTop,
                    };
                    node.style.position = "initial";
                    return pos;
                })();
                div.style.top = nodePos.y + "px";
                div.style.left = nodePos.x + "px";
                div.classList.add(classes.warningWrapper);
                return div;
            })());
            this_1.errorFunc.set(node, function (errors, showError) {
                showError(errors);
            });
            this_1.validFunc.set(node, function () {
                return;
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = el.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            _loop_1(node);
        }
        this.setListeners();
    }
    Validator.prototype.validate = function () {
        var errors = 0;
        for (var _i = 0, _a = this.el.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            this.errors.set(node, []);
            this.validationCallBack(node.value, this.pushError(node));
            if (this.errors.get(node).length > 0) {
                errors++;
                this.errorFunc.get(node)(this.errors, this.showError);
            }
            else {
                this.validFunc.get(node)();
                node.classList.remove(classes.border);
                this.errorsDiv.get(node).remove();
            }
        }
        if (errors > 0) {
            this.onError();
        }
        else {
            this.onValid();
        }
        return this;
    };
    Validator.prototype.error = function (func) {
        for (var _i = 0, _a = this.el.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            this.errorFunc.set(node, func.bind(this));
        }
        return this;
    };
    Validator.prototype.valid = function (func) {
        for (var _i = 0, _a = this.el.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            this.validFunc.set(node, func.bind(this));
        }
        return this;
    };
    Validator.prototype.pushError = function (node) {
        var _this = this;
        return function (error) {
            _this.errors.get(node).push(error);
        };
    };
    Validator.prototype.showError = function (errors) {
        var _this = this;
        var _loop_2 = function (node) {
            this_2.errorsDiv.get(node).innerHTML = "";
            var errorDivs = [];
            var _errors = errors.get(node);
            if (!_errors) {
                return { value: void 0 };
            }
            node.classList.add(classes.border);
            if (_errors.length === 0) {
                node.classList.remove(classes.border);
            }
            if (_errors.length === 1 && _errors[0] === "") {
                node.classList.remove(classes.border);
                this_2.errorsDiv.get(node).remove();
                return "continue";
            }
            for (var _i = 0, _errors_1 = _errors; _i < _errors_1.length; _i++) {
                var err = _errors_1[_i];
                var div = document.createElement("div");
                div.classList.add(classes.warningText);
                div.textContent = "- " + err;
                errorDivs.push(div);
            }
            errorDivs.forEach(function (div) {
                _this.errorsDiv.get(node).append(div);
            });
            var parent_1 = node.parentElement;
            if (!parent_1) {
                throw new Error("Parent not found");
            }
            parent_1.insertBefore(this_2.errorsDiv.get(node), node.nextElementSibling);
        };
        var this_2 = this;
        for (var _i = 0, _a = this.el.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            var state_1 = _loop_2(node);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    Validator.prototype.setListeners = function () {
        var _this = this;
        var _loop_3 = function (node) {
            node.addEventListener("focus", function (ev) {
                _this.errorsDiv.get(node).classList.remove(classes.hide);
            });
            node.addEventListener("blur", function (ev) {
                _this.errorsDiv.get(node).classList.add(classes.hide);
            });
        };
        for (var _i = 0, _a = this.el.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            _loop_3(node);
        }
    };
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Validator)
    ], Validator.prototype, "validate", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Validator)
    ], Validator.prototype, "error", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Validator)
    ], Validator.prototype, "valid", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLInputElement]),
        __metadata("design:returntype", void 0)
    ], Validator.prototype, "pushError", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Map]),
        __metadata("design:returntype", void 0)
    ], Validator.prototype, "showError", null);
    __decorate([
        Bind_1.Bind(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Validator.prototype, "setListeners", null);
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map