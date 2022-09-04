import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'Sin Titulo';
  @Input() data: number[] = [100, 100, 100];
  @Input() backgroundColor: string[] =["#6857E6", "#009FEE", "#F02059"];
  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = ['Label-1', 'Label-2', 'Label-3'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data,
        backgroundColor: this.backgroundColor
      },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{
        data: this.data,
        backgroundColor: this.backgroundColor
      }],
    };
  }




}
