import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

    private pessoas: Pessoa[] = [
    { id: 1, nome: 'Ana', idade: 25 },
    { id: 2, nome: 'Carlos', idade: 30 },
    { id: 3, nome: 'Bianca', idade: 28 }
  ];

  listarPessoas(): Observable<Pessoa[]> {
    return of(this.pessoas);
  }

  buscarPorId(id: number): Observable<Pessoa | undefined> {
    const pessoa = this.pessoas.find(p => p.id === id);
    return of(pessoa);
  }

  atualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const index = this.pessoas.findIndex(p => p.id === pessoa.id);
    if (index !== -1) {
      this.pessoas[index] = pessoa;

    }
    return of(pessoa);
  }
}
