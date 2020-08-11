import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesFormComponent } from './controles-form.component';

describe('ControlesFormComponent', () => {
  let component: ControlesFormComponent;
  let fixture: ComponentFixture<ControlesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
