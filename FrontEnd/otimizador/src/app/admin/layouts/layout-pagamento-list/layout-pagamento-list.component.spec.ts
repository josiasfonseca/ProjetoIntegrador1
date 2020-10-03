import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPagamentoListComponent } from './layout-pagamento-list.component';

describe('LayoutPagamentoListComponent', () => {
  let component: LayoutPagamentoListComponent;
  let fixture: ComponentFixture<LayoutPagamentoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPagamentoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPagamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
