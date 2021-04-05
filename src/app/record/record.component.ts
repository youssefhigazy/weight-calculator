import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    this.body = document.querySelector(".main");
    this.storageWeightData = JSON.parse(localStorage.getItem("weight-data"));
    this.storageWeightLabels = JSON.parse(localStorage.getItem("weight-labels"));
    this.storageMeasurementObject = JSON.parse(localStorage.getItem("current-measurement-information"));
    this.graph(this.storageWeightData, this.storageWeightLabels);
  }
  
  graph(number: number[], labels){
    let element = document.createElement("canvas");
    element.setAttribute("id", "myChart");
    this.body.appendChild(element);
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
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
          tooltips:{
            callbacks: {
              beforeFooter: () => {
                let header = "The characterstics for this measurement";
                return header;
              },
              footer: (tooltipItem, data) => {
                let value = tooltipItem;
                let finalValue = Object.values(this.storageMeasurementObject[value[0].index]);
                return finalValue;
              }
            }
          }
      }
    });
  }


}
