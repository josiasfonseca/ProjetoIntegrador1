import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRecebimentoDetailsComponent } from './layout-recebimento-details.component';

describe('LayoutRecebimentoDetailsComponent', () => {
  let component: LayoutRecebimentoDetailsComponent;
  let fixture: ComponentFixture<LayoutRecebimentoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutRecebimentoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRecebimentoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
