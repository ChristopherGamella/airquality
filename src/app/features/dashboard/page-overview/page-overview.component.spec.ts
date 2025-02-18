import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOverviewComponent } from './page-overview.component';

describe('PageOverviewComponent', () => {
  let component: PageOverviewComponent;
  let fixture: ComponentFixture<PageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
