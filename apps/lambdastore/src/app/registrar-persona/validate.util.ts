import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export namespace ValidateUtil {
  export function isInvalidForm<
    TControl extends {
      [K in keyof TControl]: AbstractControl<any, any>;
    } = any
  >(formulario: FormGroup): boolean {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach((control) => {
        if (control instanceof FormArray) {
          control.controls.forEach((fg) => {
            isInvalidForm(fg as FormGroup);
          });
          return;
        }

        if (control instanceof FormGroup) {
          isInvalidForm(control);
          return;
        }

        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return true;
    }

    return false;
  }
}
