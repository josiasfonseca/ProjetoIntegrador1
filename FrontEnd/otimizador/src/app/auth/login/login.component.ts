import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  f: FormGroup;
  errorCredential = false;
  msg = '';

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.f = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });


  }

  logar() {
    this.msg = 'Aguarde... Realizando login...';
    setTimeout(() => {
      this.service.login(this.f.value)
      .subscribe((response: any) => {
        // this.router.navigate(['/']);
        window.location.href = '/';
      }, (error: any) => {
          this.errorCredential = true;
          this.msg = '';
      });
    }, 300);
  }

}
