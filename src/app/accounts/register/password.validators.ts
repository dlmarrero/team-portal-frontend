import { AbstractControl, ValidationErrors } from "@angular/forms";



export class PasswordValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace: false };

    }
    static passwordComplexity(control: AbstractControl): ValidationErrors | null {
        var selval = (control.value).split("");
        var specChar = ("!`@~#$%^&*()_-+=<>?:\"{}|\]{\';,./").split("");
        var specBool: boolean = false;
        selval.forEach(element => {
            specChar.forEach(ele => {
                if (element == ele)
                    specBool = true;

            });
        });
        if (specBool == false)
            return { passwordComplexity: specBool };
        else
            return null
    }
    static upperCharacter(control: AbstractControl): ValidationErrors | null {
        var selval = (control.value).split("");
        var specChar = ("ZXCVBNMASDFGHJKLQWERTYUIOP").split("");
        var specBool: boolean = false;
        selval.forEach(element => {
            specChar.forEach(ele => {
                if (element == ele)
                    specBool = true;

            });
        });
        if (specBool == false)
            return { upperCharacter: specBool };
        else
            return null
    }
    static lowerCharacter(control: AbstractControl): ValidationErrors | null {
        var selval = (control.value).split("");
        var specChar = ("zxcvbnmasdfghjklqwertyuiop").split("");
        var specBool: boolean = false;
        selval.forEach(element => {
            specChar.forEach(ele => {
                if (element == ele)
                    specBool = true;

            });
        });
        if (specBool == false)
            return { lowerCharacter: specBool };
        else
            return null
    }
    static numberCharacter(control: AbstractControl): ValidationErrors | null {
        var selval = (control.value).split("");
        var specChar = ("0123456789").split("");
        var specBool: boolean = false;
        selval.forEach(element => {
            specChar.forEach(ele => {
                if (element == ele)
                    specBool = true;

            });
        });
        if (specBool == false)
            return { numberCharacter: specBool };
        else
            return null
    }
    static rateChecker(control: AbstractControl): ValidationErrors | null {
        var selval = control.value as string;
        var lowerVal = selval.toLowerCase();
        var checkBool = false;
        let pattern = new RegExp("/(^[A-Z]{2,3}(SN|SA|SR|[123]|C|CS|CM)$)|^ENS$|^LTJG$|^LT$/i");
        let officerRanks = ["ens", "ltjg", "lt", "lcdr", "cdr"];
        officerRanks.forEach(element => {
            if (lowerVal == element) {
                checkBool = true;
            }
        });
        if (pattern.test(lowerVal))
            checkBool = true;

        if (checkBool == false)
            return { rateChecker: checkBool };
        else
            return null
    }
    static whatDate(control: AbstractControl): ValidationErrors | null {
        console.log(control.value as string);
        return null;
    }
} 
