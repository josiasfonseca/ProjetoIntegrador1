import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorResultClienteErroComponent } from './importador-result-cliente-erro.component';

describe('ImportadorResultClienteErroComponent', () => {
  let component: ImportadorResultClienteErroComponent;
  let fixture: ComponentFixture<ImportadorResultClienteErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorResultClienteErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorResultClienteErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
