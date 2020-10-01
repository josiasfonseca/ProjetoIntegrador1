import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private config: NgSelectConfig) {
      this.config.notFoundText = 'Não encontrado dados!';
      this.config.placeholder = 'Pequisar...';
      this.config.loadingText = 'Buscando dados...';
    }
  url = this.route.snapshot.url;
  title = 'otimizador';

  ngOnInit() {  }
}
