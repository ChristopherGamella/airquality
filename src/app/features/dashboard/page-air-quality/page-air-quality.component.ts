import { Component } from '@angular/core';
import { timeSeriesData, timeSeriesData2, timeSeriesData3, timeSeriesData4, timeSeriesData5, timeSeriesData6 } from '../../../models/mock';
import { CommonModule } from '@angular/common';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-page-air-quality',
  standalone: true,
  imports: [
    CommonModule,
    NgxEchartsModule
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

  co = timeSeriesData //CO (mg/m^3): Carbon monoxide concentration.
  pt08s1 = timeSeriesData2 //PT08.S1 (CO): Tin oxide concentration.
  nmhc = timeSeriesData2 //Non-Methanic Hydrocarbons (NMHC): Concentration levels.
  c6h6 = timeSeriesData4 //Benzene (mg/m^3): Benzene concentration.
  pt08s2 = timeSeriesData5 //PT08.S2 (NMHC): Titania concentration.
  nox = timeSeriesData6 //Nitrogen oxides (NOx): Concentration levels.


  chartOption: any;

  ngOnInit(): void {
    this.chartOption = {
      title: {
        text: 'Air Quality Time Series'
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
        data: ['CO', 'PT08.S1', 'NMHC', 'C6H6', 'PT08.S2', 'NOx']
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
        data: this.co.map(item => item[0])
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'CO',
          type: 'line',
          data: this.co.map(item => item[1]),
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
        },
        {
          name: 'PT08.S1',
          type: 'line',
          data: this.pt08s1.map(item => item[1]),
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
        },
        {
          name: 'NMHC',
          type: 'line',
          data: this.nmhc.map(item => item[1]),
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
        },
        {
          name: 'C6H6',
          type: 'line',
          data: this.c6h6.map(item => item[1]),
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
        },
        {
          name: 'PT08.S2',
          type: 'line',
          data: this.pt08s2.map(item => item[1]),
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
        },
        {
          name: 'NOx',
          type: 'line',
          data: this.nox.map(item => item[1]),
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
        }
      ],
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

}
