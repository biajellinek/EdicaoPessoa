import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.min(0)]]
    });
  }

  salvar() {
    if (this.form.valid) {
      const pessoasJSON = localStorage.getItem('pessoas');
      let pessoas = pessoasJSON ? JSON.parse(pessoasJSON) : [];

      const novoId = pessoas.length > 0 ? Math.max(...pessoas.map((p: any) => p.id)) + 1 : 1;

      const novaPessoa = {
        id: novoId,
        nome: this.form.get('nome')?.value,
        idade: this.form.get('idade')?.value
      };

      pessoas.push(novaPessoa);
      localStorage.setItem('pessoas', JSON.stringify(pessoas));

      Swal.fire('Pessoa cadastrada com sucesso!', '', 'success');
      this.router.navigate(['/pessoa']);
    } else {
      Swal.fire('Por favor, preencha os campos corretamente.', '', 'error');
    }
  }
}
