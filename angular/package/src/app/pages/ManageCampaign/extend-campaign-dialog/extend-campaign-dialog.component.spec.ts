import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendCampaignDialogComponent } from './extend-campaign-dialog.component';

describe('ExtendCampaignDialogComponent', () => {
  let component: ExtendCampaignDialogComponent;
  let fixture: ComponentFixture<ExtendCampaignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtendCampaignDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendCampaignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
