import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorListComponent } from './importador-list.component';

describe('ImportadorListComponent', () => {
  let component: ImportadorListComponent;
  let fixture: ComponentFixture<ImportadorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
