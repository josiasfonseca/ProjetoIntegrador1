import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRecebimentoListComponent } from './layout-recebimento-list.component';

describe('LayoutRecebimentoListComponent', () => {
  let component: LayoutRecebimentoListComponent;
  let fixture: ComponentFixture<LayoutRecebimentoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutRecebimentoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRecebimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
