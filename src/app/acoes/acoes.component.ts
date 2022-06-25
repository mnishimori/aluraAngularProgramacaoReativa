import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AcoesService} from './acoes.service';
import {debounceTime, distinctUntilChanged, filter, startWith, switchMap} from 'rxjs/operators';

const TEMPO_ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  acoes$ = this.acoesInput.valueChanges
    .pipe(
      startWith('')
    )
    .pipe(
      debounceTime(TEMPO_ESPERA_DIGITACAO),
      filter(valorDigitado => valorDigitado.length >= 3 || !valorDigitado.length),
      distinctUntilChanged(),
      switchMap( (valorDigitado) => this.acoesService.getAcoes(valorDigitado))
    );

  constructor(private acoesService: AcoesService) {}

}
