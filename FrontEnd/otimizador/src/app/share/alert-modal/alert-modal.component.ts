import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BsModalRef  } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit, OnDestroy {

  @Input() type = 'success';
  @Input() message = 'success';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    // console.log('Criou modal');
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    // console.log('Destruiu modal111');
  }

}
