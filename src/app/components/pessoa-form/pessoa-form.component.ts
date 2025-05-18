import { Component, EventEmitter, inject, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit, OnDestroy {

  @Input('pessoa') pessoa: any = {
    id: null,
    nome: '',
    idade: ''
  };
  @Output('meuEvento') meuEvento = new EventEmitter();

  form!: FormGroup;
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  private routeSub!: Subscription;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.routeSub = this.rotaAtivida.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.pessoa.id = Number(idParam);
        this.carregarPessoa(this.pessoa.id);
      }
    });
  }

  carregarPessoa(id: number) {
    const pessoasJSON = localStorage.getItem('pessoas');
    if (pessoasJSON) {
      const pessoas = JSON.parse(pessoasJSON);
      const pessoaEncontrada = pessoas.find((p: any) => p.id === id);
      if (pessoaEncontrada) {
        this.pessoa = pessoaEncontrada;
        this.form.patchValue(this.pessoa);
      }
    }
  }

  save() {
    if (this.form.valid) {
      const pessoasJSON = localStorage.getItem('pessoas');
      let pessoas = pessoasJSON ? JSON.parse(pessoasJSON) : [];

       if (!this.pessoa.id || this.pessoa.id <= 0) {
      const novoId = pessoas.length > 0 ? Math.max(...pessoas.map((p: any) => p.id)) + 1 : 1;
      this.pessoa.id = novoId;
    }

      const index = pessoas.findIndex((p: any) => p.id === this.pessoa.id);
    if (index !== -1) {
      // Atualiza pessoa existente
      pessoas[index] = { id: this.pessoa.id, ...this.form.value };
    } else {
      // Adiciona nova pessoa com id válido
      pessoas.push({ id: this.pessoa.id, ...this.form.value });
    }

      localStorage.setItem('pessoas', JSON.stringify(pessoas));
      Swal.fire('Pessoa salva com sucesso!', '', 'success');
      this.roteador.navigate(['/pessoa']);
      this.meuEvento.emit("OK");
    } else {
      Swal.fire('Formulário inválido', '', 'error');
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
