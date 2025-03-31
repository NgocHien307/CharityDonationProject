import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListCampaignComponent } from './view-list-campaign.component';

describe('ViewListCampaignComponent', () => {
  let component: ViewListCampaignComponent;
  let fixture: ComponentFixture<ViewListCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListCampaignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
