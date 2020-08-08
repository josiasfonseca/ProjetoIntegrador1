import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesListComponent } from './controles-list.component';

describe('ControlesListComponent', () => {
  let component: ControlesListComponent;
  let fixture: ComponentFixture<ControlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
