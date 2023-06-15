import { Component, OnInit } from '@angular/core';
import { User } from 'libs/users/src/lib/models/user';
import { UsersService } from './user.service';
import { RegistrarForm } from './registrar.form';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss'],
})
export class RegistrarPersonaComponent implements OnInit {
  public usuarios: User[];
  paises = [];
  constructor(
    private messageService: MessageService,
    private readonly location: Location,
    private readonly usersService: UsersService,
    public readonly registrarForm: RegistrarForm
  ) {
    this.paises = [
      {
        name: 'Perú',
        code: 'PE',
      },
      {
        name: 'Argentina',
        code: 'AR',
      },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.usuarios = await this.usersService.getUsers();

    console.log(this.usuarios);
  }

  async registro(user: User) {
    await this.usersService.createUser(user).then((user: User) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `¡Gracias por unirte a nuestra tienda ${user.name}!`,
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    });
  }

  async registrarUsuario() {
    if (!this.registrarForm.validate() || this.registrarForm.enviandoFormulario)
      return;

    try {
      this.registrarForm.formulario.disable();
      const request = await this.registrarForm.toRequest();
      console.log(request);
      this.registro(request);
    } catch (error) {}
  }
}
