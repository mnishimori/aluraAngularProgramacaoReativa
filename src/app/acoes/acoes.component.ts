import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Acoes} from './modelo/acoes';
import {AcoesService} from './acoes.service';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  acoes$: Observable<Acoes> = this.acoesService.getAcoes();

  constructor(private acoesService: AcoesService) {}

}
