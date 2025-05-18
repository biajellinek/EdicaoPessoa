import { Component } from '@angular/core';
import { PessoaListComponent } from "../pessoalist/pessoalist.component";
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ MenuComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
