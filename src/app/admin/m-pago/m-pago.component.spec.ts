import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPagoComponent } from './m-pago.component';

describe('MPagoComponent', () => {
  let component: MPagoComponent;
  let fixture: ComponentFixture<MPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
