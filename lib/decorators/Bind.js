"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind = function () {
    return function (_target, key, descriptor) {
        if (!descriptor || typeof descriptor.value !== "function") {
            throw new Error("Not Method");
        }
        return {
            configurable: true,
            get: function () {
                var _a;
                var bound = (_a = descriptor.value) === null || _a === void 0 ? void 0 : _a.bind(this);
                Object.defineProperty(this, key, {
                    configurable: true,
                    value: bound,
                    writable: true
                });
                return bound;
            }
        };
    };
};
//# sourceMappingURL=Bind.js.map