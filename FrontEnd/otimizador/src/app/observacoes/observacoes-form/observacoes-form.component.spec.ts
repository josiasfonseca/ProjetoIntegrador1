import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacoesFormComponent } from './observacoes-form.component';

describe('ObservacoesFormComponent', () => {
  let component: ObservacoesFormComponent;
  let fixture: ComponentFixture<ObservacoesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacoesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
