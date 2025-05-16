import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieFilterComponent } from './pie-filter.component';

describe('PieFilterComponent', () => {
  let component: PieFilterComponent;
  let fixture: ComponentFixture<PieFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
