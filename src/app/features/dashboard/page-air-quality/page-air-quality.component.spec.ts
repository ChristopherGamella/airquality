import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAirQualityComponent } from './page-air-quality.component';

describe('PageAirQualityComponent', () => {
  let component: PageAirQualityComponent;
  let fixture: ComponentFixture<PageAirQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAirQualityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAirQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
