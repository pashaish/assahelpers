import "reflect-metadata";
import { DOM } from "../dom/dom";
export declare type t_validationCallBack = (val: string, pushError: (str: string) => void) => void;
export declare class Validator {
    private el;
    private validationCallBack;
    private errors;
    private errorsDiv;
    constructor(el: DOM<HTMLInputElement>, validationCallBack: t_validationCallBack);
    validate(): Validator;
    onError: () => void;
    onValid: () => void;
    error(func: (errors: Map<HTMLInputElement, string[]>, showError: (errors: Map<HTMLInputElement, string[]>) => void) => void): Validator;
    valid(func: () => void): Validator;
    private pushError;
    private errorFunc;
    private validFunc;
    private showError;
    private setListeners;
}
//# sourceMappingURL=validator.d.ts.map