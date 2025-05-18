import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './components/pessoalist/pessoalist.component';

export const routes: Routes = [
   { path: '', redirectTo: 'pessoa', pathMatch: 'full' },
  { path: 'pessoa', component: DashboardComponent, children: [
      { path: '', component: PessoaListComponent },  // Rota padrão que carrega a lista
      { path: 'new', component: PrincipalComponent },
      { path: 'edit/:id', component: PessoaFormComponent }
    ]
  }


];
