import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasFormComponent } from './empresas-form.component';

describe('EmpresasFormComponent', () => {
  let component: EmpresasFormComponent;
  let fixture: ComponentFixture<EmpresasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
