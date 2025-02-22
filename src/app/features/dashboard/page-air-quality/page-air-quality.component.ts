import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { AirQualityService } from '../../../services/air-quality.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-page-air-quality',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule,
  ],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({
        echarts: () => import('echarts')
      })
    }
  ],
  templateUrl: './page-air-quality.component.html',
  styleUrl: './page-air-quality.component.css'
})
export class PageAirQualityComponent {

  constructor(private airQualityService: AirQualityService) { }

  showMetrics = true;

  startDate: string = '2004-10-01';
  endDate: string = '2004-11-01';

  cols = [
    { field: 'CO_GT', selected: false, data: [] },
    { field: 'PT08_S1_CO', selected: false, data: [] },
    { field: 'NMHC_GT', selected: false, data: [] },
    { field: 'C6H6_GT', selected: false, data: [] },
    { field: 'PT08_S2_NMHC', selected: false, data: [] },
    { field: 'NOx_GT', selected: false, data: [] },
    { field: 'PT08_S3_NOx', selected: false, data: [] },
    { field: 'NO2_GT', selected: false, data: [] },
    { field: 'PT08_S4_NO2', selected: false, data: [] },
    { field: 'PT08_S5_O3', selected: false, data: [] },
    { field: 'T', selected: false, data: [] },
    { field: 'RH', selected: false, data: [] },
    { field: 'AH', selected: false, data: [] }
  ]

  onFilter() {
    console.log('Filter applied');

    this.cols.forEach(col => {
      if (col.selected) {
        this.fetchMetrics(col);
      }
    });

  }

  onColumnSelected($event: any, col: any) {
    console.log('Column selected', $event.target.checked, col);
    if ($event.target.checked) {
      this.fetchMetrics(col);
    } else {
      col.data = [];
      this.updateChart();
    }

  }

  fetchMetrics(col: any) {
    if (col.selected) {
      this.airQualityService.fetchData(col.field, this.startDate, this.endDate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          col.data = data;
          this.updateChart();
        });
    } else {
      col.data = [];
      this.updateChart();
    }

  }

  normalizeData(data: any[]): any[] {
    const values = data.map(item => item[1]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return data.map(item => [item[0], (item[1] - min) / (max - min)]);
  }


  chartOption: any;

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart() {
    const selectedMetrics = this.cols.filter(col => col.selected);
    const series = selectedMetrics.map(metric => ({
      name: metric.field,
      type: 'line',
      data: metric.data.map(item => item[1]),
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Average' }
        ]
      }
    }));

    this.chartOption = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          let result = params[0].name + '<br/>';
          params.forEach(function (item: any) {
            result += item.seriesName + ': ' + item.value + '<br/>';
          });
          return result;
        }
      },
      legend: {
        data: selectedMetrics.map(metric => metric.field)
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {},
          dataView: { readOnly: false },
          restore: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.cols[0].data.map(item => item[0])
      },
      yAxis: {
        type: 'value'
      },
      series: series,
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        }
      ]
    };
  }

  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
