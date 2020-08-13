import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacoesListComponent } from './observacoes-list.component';

describe('ObservacoesListComponent', () => {
  let component: ObservacoesListComponent;
  let fixture: ComponentFixture<ObservacoesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacoesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
