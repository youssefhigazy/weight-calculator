import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Chart from 'chart.js';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  body: HTMLElement;
  storageMeasurementObject;
  storageWeightData;
  storageWeightLabels;

  constructor(private titleservice: Title) {
    this.titleservice.setTitle("Record");
  }


  ngOnInit(): void {
    this.body = document.querySelector('.main');

    this.storageWeightData = JSON.parse(localStorage.getItem('weight-data'));
    this.storageWeightLabels = JSON.parse(localStorage.getItem('weight-labels'));
    this.storageMeasurementObject = JSON.parse(localStorage.getItem('current-measurement-information'));
    this.graph(this.storageWeightData, this.storageWeightLabels);
  }

  graph(number: number[], labels): void{
    const element = document.createElement('canvas');
    element.setAttribute('id', 'myChart');
    this.body.appendChild(element);
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels,
          datasets: [{
              label: 'Weight Measurements',
              data: [...number],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      stepSize: 20,
                      suggestedMax: 300
                  }
              }]
          },
          tooltips: {
            callbacks: {
              beforeFooter: () => {
                const header = 'The characterstics for this measurement';
                return header;
              },
              footer: (tooltipItem, data) => {
                const value = tooltipItem;
                const finalKeys = Object.keys(this.storageMeasurementObject[value[0].index]);
                const finalValues = Object.values(this.storageMeasurementObject[value[0].index]);
                // console.log(Object.entries(this.storageMeasurementObject[value[0].index]));
                return Object.entries(this.storageMeasurementObject[value[0].index]).map(array => array.join(': '));
              }
            }
          }
      }
    });
  }
}
