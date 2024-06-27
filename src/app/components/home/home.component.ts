import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public myChart: Chart;

  // public chartType: string = 'pie';

  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public pieChartLabels = [['SciFi'], ['Drama'], 'Comedy'];
  // public pieChartData = [30, 50, 20];
  // //public pieChartType : string = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
  constructor() {

  }

  ngOnInit(): void {
    // this.myChart = new Chart('myChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [{
    //       label: 'My Dataset',
    //       data: [12, 19, 3, 5, 2, 3, 7],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)',
    //         'rgba(255, 99, 132, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)',
    //         'rgba(255, 99, 132, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });
  }


}
