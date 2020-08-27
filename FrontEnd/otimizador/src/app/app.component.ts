import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}
  url = this.route.snapshot.url;
  title = 'otimizador';

  ngOnInit() {
  }
}
