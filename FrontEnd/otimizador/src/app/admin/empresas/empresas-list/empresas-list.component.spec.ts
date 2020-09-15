import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasListComponent } from './empresas-list.component';

describe('EmpresasListComponent', () => {
  let component: EmpresasListComponent;
  let fixture: ComponentFixture<EmpresasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
