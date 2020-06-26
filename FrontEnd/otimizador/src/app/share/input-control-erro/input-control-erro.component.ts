
import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-input-control-erro',
  templateUrl: './input-control-erro.component.html',
  styleUrls: ['./input-control-erro.component.css']
})
export class InputControlErroComponent implements OnInit {

  @Input() msgErro: string;
  @Input() mostrarErro: boolean;

  constructor() { }

  ngOnInit() {
  }

}
