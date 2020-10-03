import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPagamentoDetailsComponent } from './layout-pagamento-details.component';

describe('LayoutPagamentoComponent', () => {
  let component: LayoutPagamentoDetailsComponent;
  let fixture: ComponentFixture<LayoutPagamentoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPagamentoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPagamentoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
