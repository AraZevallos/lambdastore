import { Component, OnInit } from '@angular/core';
import { Comentarios } from './comentario.dto';
import { ComentarioService } from './comentario.service';

@Component({
  selector: 'frontend-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
  public comentarios: Comentarios[];
  constructor(private readonly comentarioService: ComentarioService) {}

  async ngOnInit(): Promise<void> {
    this.comentarios = await this.comentarioService.getComentarios();

    console.log(this.comentarios);
  }
}
