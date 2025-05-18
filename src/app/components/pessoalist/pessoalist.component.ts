import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoalist.component.html',
  standalone: true,
  imports: [RouterLink,CommonModule]
})
export class PessoaListComponent {
  lista: Pessoa[] = [];

  ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas() {
    const pessoasJSON = localStorage.getItem('pessoas');
    if (pessoasJSON) {
      this.lista = JSON.parse(pessoasJSON);
    } else {
      this.lista = [];
    }
    console.log('Lista de pessoas carregada:', this.lista);
  }

  deletePessoa(id: number) {
  const pessoasJSON = localStorage.getItem('pessoas');
  let pessoas = pessoasJSON ? JSON.parse(pessoasJSON) : [];
  pessoas = pessoas.filter((p: any) => p.id !== id);
  localStorage.setItem('pessoas', JSON.stringify(pessoas));
  this.lista = pessoas;
}
}
