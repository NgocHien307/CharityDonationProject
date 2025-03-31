import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailCampaignComponent } from './view-detail-campaign.component';

describe('ViewDetailCampaignComponent', () => {
  let component: ViewDetailCampaignComponent;
  let fixture: ComponentFixture<ViewDetailCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailCampaignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
