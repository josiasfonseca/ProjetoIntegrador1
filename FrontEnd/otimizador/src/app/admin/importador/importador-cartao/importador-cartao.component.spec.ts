import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorCartaoComponent } from './importador-cartao.component';

describe('ImportadorCartaoComponent', () => {
  let component: ImportadorCartaoComponent;
  let fixture: ComponentFixture<ImportadorCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportadorCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportadorCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
