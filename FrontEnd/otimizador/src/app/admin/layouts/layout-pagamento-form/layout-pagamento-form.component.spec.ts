import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPagamentoFormComponent } from './layout-pagamento-form.component';

describe('LayoutPagamentoFormComponent', () => {
  let component: LayoutPagamentoFormComponent;
  let fixture: ComponentFixture<LayoutPagamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPagamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPagamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
