import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorResultFornecedorErroComponent } from './importador-result-fornecedor-erro.component';

describe('ImportadorResultComponent', () => {
  let component: ImportadorResultFornecedorErroComponent;
  let fixture: ComponentFixture<ImportadorResultFornecedorErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorResultFornecedorErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorResultFornecedorErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
