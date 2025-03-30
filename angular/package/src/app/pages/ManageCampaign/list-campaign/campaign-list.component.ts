import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-campaign',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class ListCampaignComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public listCampaign: Campaign[] = [];
  dataSource1 = new MatTableDataSource<Campaign>(this.listCampaign);
  
  // Đặt các cột hiển thị
  displayedColumns1: string[] = ['title', 'goalAmount', 'status', 'action'];

  constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.onGetData();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  onClickAdd() {
    this.router.navigate(['list-campaign', 'add-campaign']);
  }

  onGetData() {
    this.campaignService.getAllCampaigns().subscribe((data) => {
      console.log("List Campaign from API:", data);
      this.listCampaign = data;
      this.dataSource1 = new MatTableDataSource<Campaign>(this.listCampaign);
      this.dataSource1.paginator = this.paginator;
    });
  }

  onDetailPage(elementId: number) {
    this.router.navigate(['list-campaign', 'edit-campaign', elementId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource1.filter = filterValue;

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
