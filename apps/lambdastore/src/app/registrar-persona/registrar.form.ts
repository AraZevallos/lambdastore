import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateUtil } from './validate.util';
import { User } from './user';

@Injectable()
export class RegistrarForm {
  public readonly formulario = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
    password: new FormControl<string>(null, [Validators.required]),
    email: new FormControl<string>(null, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl<string>(null, [Validators.required]),
    isAdmin: new FormControl<boolean>(false),
    street: new FormControl<string>(null, [Validators.required]),
    apartment: new FormControl<string>(null, [Validators.required]),
    zip: new FormControl<string>(null, [Validators.required]),
    city: new FormControl<string>(null, [Validators.required]),
    country: new FormControl<string>('Perú'),
  });

  public enviandoFormulario: boolean;
  public hasErrorFromAPI: boolean;
  public errorMessageFromAPI: string;

  public submitted: boolean;

  constructor() {
    this.enviandoFormulario = false;
    this.hasErrorFromAPI = false;
    this.submitted = false;
  }

  isInvalid(atributo: 'username' | 'password'): boolean {
    if (this.formulario.get(atributo).disabled) return false;

    return (
      this.formulario.get(atributo).invalid &&
      this.formulario.get(atributo).dirty
    );
  }

  validate(): boolean {
    this.submitted = true;

    return !ValidateUtil.isInvalidForm(this.formulario);
  }

  prepararFormularioToAPI(): void {
    this.enviandoFormulario = true;
    this.hasErrorFromAPI = false;
    this.errorMessageFromAPI = null;
    this.formulario.disable();
  }

  resetear(): void {
    this.submitted = false;
    this.enviandoFormulario = false;
    this.hasErrorFromAPI = false;
    this.errorMessageFromAPI = null;
    this.formulario.get('name').setValidators([Validators.required]);
    this.formulario.get('name').updateValueAndValidity();
    this.formulario.get('password').setValidators([Validators.required]);
    this.formulario.get('password').updateValueAndValidity();
  }

  async toRequest(): Promise<User> {
    const formValue = this.formulario.getRawValue();
    const request: User = {
      name: formValue.name,
      password: formValue.password,
      isAdmin: formValue.isAdmin,
      apartment: formValue.apartment,
      city: formValue.city,
      country: formValue.country,
      email: formValue.email,
      phone: formValue.phone,
      street: formValue.street,
      zip: formValue.zip,
    };
    return request;
  }
}
