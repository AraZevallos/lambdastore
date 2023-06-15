import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Comentarios } from './comentario.dto';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  apiURLUsers = environment.apiURL + 'commentaries/';
  constructor(private http: HttpClient) {}

  getComentarios(): Promise<Comentarios[]> {
    return firstValueFrom(this.http.get<Comentarios[]>(this.apiURLUsers));
  }

  crearComentario(comentario: Comentarios): Promise<Comentarios> {
    return firstValueFrom(
      this.http.post<Comentarios>(this.apiURLUsers, comentario)
    );
  }
}
