import { Component, OnInit } from '@angular/core';
import { Comentarios } from './comentario.dto';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ComentarioService } from './comentario.service';
import { ComentarioForm } from './comentario.form';
import { timer } from 'rxjs';

@Component({
  selector: 'frontend-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  public comentarios: Comentarios[];

  constructor(
    private messageService: MessageService,
    private readonly location: Location,
    private readonly comentarioService: ComentarioService,
    public readonly comentarioForm: ComentarioForm
  ) {}

  async ngOnInit(): Promise<void> {
    this.comentarios = await this.comentarioService.getComentarios();

    console.log(this.comentarios);
  }

  async enviar(comentario: Comentarios) {
    await this.comentarioService
      .crearComentario(comentario)
      .then((comentario: Comentarios) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `¡Gracias por dejarnos un comentario!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      });
  }

  async submit() {
    if (
      !this.comentarioForm.validate() ||
      this.comentarioForm.enviandoFormulario
    )
      return;

    try {
      this.comentarioForm.formulario.disable();
      const request = await this.comentarioForm.toRequest();
      console.log(request);
      this.enviar(request);
    } catch (error) {}
    finally{
      this.comentarioForm.resetear()
    }
  }
}
