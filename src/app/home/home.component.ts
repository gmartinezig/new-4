import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_CHIPS_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxAvatarComponent } from 'igniteui-angular';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { Subject, takeUntil } from 'rxjs';
import { RevenueType } from '../models/ecommerce/revenue-type';
import { CustomersType } from '../models/northwind/customers-type';
import { MeetingsTasksType } from '../models/crmapp/meetings-tasks-type';
import { NorthwindService } from '../services/northwind.service';
import { ECommerceService } from '../services/ecommerce.service';
import { CRMAppService } from '../services/crmapp.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IGX_CHIPS_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxCategoryChartModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public eCommerceRevenue: RevenueType[] = [];
  public northwindCustomers: CustomersType[] = [];
  public cRMAppMeetingsTasks: MeetingsTasksType[] = [];

  constructor(private eCommerceService: ECommerceService, private northwindService: NorthwindService, private cRMAppService: CRMAppService) { }

  ngOnInit() {
    this.eCommerceService.getRevenueList().pipe(takeUntil(this.destroy$)).subscribe(data => this.eCommerceRevenue = data);
    this.northwindService.getCustomers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindCustomers = data,
      error: (_err: any) => this.northwindCustomers = []
    });
    this.cRMAppService.getMeetingsTasksList().pipe(takeUntil(this.destroy$)).subscribe(data => this.cRMAppMeetingsTasks = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
