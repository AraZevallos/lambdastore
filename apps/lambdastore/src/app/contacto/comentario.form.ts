import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateUtil } from '../registrar-persona/validate.util';
import { Comentarios } from './comentario.dto';


@Injectable()
export class ComentarioForm {
  public readonly formulario = new FormGroup({
    nombre: new FormControl<string>(null, [Validators.required]),
    apellidos: new FormControl<string>(null, [Validators.required]),
    correo: new FormControl<string>(null, [
      Validators.required,
      Validators.email,
    ]),
    commentary: new FormControl<string>(null, [Validators.required]),
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
    this.formulario.reset();
  }

  async toRequest(): Promise<Comentarios> {
    const formValue = this.formulario.getRawValue();
    const request: Comentarios = {
      nombres: formValue.nombre,
      apellidos: formValue.apellidos,
      correo: formValue.correo,
      commentary: formValue.commentary,
    };
    return request;
  }
}
