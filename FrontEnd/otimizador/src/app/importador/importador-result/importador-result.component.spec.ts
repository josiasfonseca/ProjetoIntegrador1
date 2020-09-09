import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorResultComponent } from './importador-result.component';

describe('ImportadorResultComponent', () => {
  let component: ImportadorResultComponent;
  let fixture: ComponentFixture<ImportadorResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
