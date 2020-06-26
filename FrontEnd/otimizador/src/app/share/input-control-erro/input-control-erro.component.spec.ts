import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControlErroComponent } from './input-control-erro.component';

describe('InputControlErroComponent', () => {
  let component: InputControlErroComponent;
  let fixture: ComponentFixture<InputControlErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputControlErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputControlErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
