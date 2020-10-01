import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPagamentoComponent } from './layout-pagamento.component';

describe('LayoutPagamentoComponent', () => {
  let component: LayoutPagamentoComponent;
  let fixture: ComponentFixture<LayoutPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
