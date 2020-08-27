import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorClienteComponent } from './importador-cliente.component';

describe('ImportadorClienteComponent', () => {
  let component: ImportadorClienteComponent;
  let fixture: ComponentFixture<ImportadorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
