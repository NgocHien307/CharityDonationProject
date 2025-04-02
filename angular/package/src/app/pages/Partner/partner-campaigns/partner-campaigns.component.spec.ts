import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCampaignsComponent } from './partner-campaigns.component';

describe('PartnerCampaignsComponent', () => {
  let component: PartnerCampaignsComponent;
  let fixture: ComponentFixture<PartnerCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerCampaignsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
