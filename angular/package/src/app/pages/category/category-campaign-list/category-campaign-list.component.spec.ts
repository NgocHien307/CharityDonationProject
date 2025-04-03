import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCampaignListComponent } from './category-campaign-list.component';

describe('CategoryCampaignListComponent', () => {
  let component: CategoryCampaignListComponent;
  let fixture: ComponentFixture<CategoryCampaignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCampaignListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
