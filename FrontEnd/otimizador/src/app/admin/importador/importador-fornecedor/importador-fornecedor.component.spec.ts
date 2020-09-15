import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorFornecedorComponent } from './importador-fornecedor.component';

describe('ImportadorFornecedorComponent', () => {
  let component: ImportadorFornecedorComponent;
  let fixture: ComponentFixture<ImportadorFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
