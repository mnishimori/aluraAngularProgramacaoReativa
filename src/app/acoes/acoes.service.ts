import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, pluck, tap} from 'rxjs/operators';
import {Acao, Acoes, AcoesApi} from './modelo/acoes';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.http.get<AcoesApi>(`http://localhost:3000/acoes`, { params })
      .pipe(
        pluck('payload'),
        map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
      );
  }

  // getAcoes(): Observable<Acoes>{
  //   return this.http.get<AcoesApi>(`http://localhost:3000/acoes`)
  //     .pipe(
  //       tap((valor) => console.log(valor)),
  //       // map((api) => api.payload), o pluck faz a mesma coisa que este map
  //       pluck('payload'),
  //       tap( (valor) => console.log(valor)),
  //       map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
  //     );
  // }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
