import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRecebimentoFormComponent } from './layout-recebimento-form.component';

describe('LayoutRecebimentoFormComponent', () => {
  let component: LayoutRecebimentoFormComponent;
  let fixture: ComponentFixture<LayoutRecebimentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutRecebimentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRecebimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
