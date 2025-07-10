import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientCreateAndEditComponent } from './patient-create-and-edit.component';

describe('PatientCreateAndEditComponent', () => {
  let component: PatientCreateAndEditComponent;
  let fixture: ComponentFixture<PatientCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
