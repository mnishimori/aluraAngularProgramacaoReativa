import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AcoesService} from './acoes.service';
import {startWith, switchMap} from 'rxjs/operators';

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
      switchMap( (valorDigitado) => this.acoesService.getAcoes(valorDigitado))
    );

  constructor(private acoesService: AcoesService) {}

}
