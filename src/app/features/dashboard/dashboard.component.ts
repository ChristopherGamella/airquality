import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PageOverviewComponent } from './page-overview/page-overview.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
