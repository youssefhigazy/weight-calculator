import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  body: HTMLElement;
  go_top_btn: HTMLElement;
  storageMeasurementObject;
  storageWeightData;
  storageWeightLabels;

  constructor() { }

  
  ngOnInit(): void {
    this.go_top_btn = document.querySelector(".go-top-btn");
    this.body = document.querySelector(".main");
    
    window.addEventListener("scroll", this.scrollTop, true);

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
                let finalKeys = Object.keys(this.storageMeasurementObject[value[0].index]);
                let finalValues = Object.values(this.storageMeasurementObject[value[0].index]);
                console.log(Object.entries(this.storageMeasurementObject[value[0].index]));
                return Object.entries(this.storageMeasurementObject[value[0].index]).map(array => array.join(": "));
              }
            }
          }
      }
    });
  }

  scrollTop = (event) => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
      this.go_top_btn.style.display = "block";
    } else {
      this.go_top_btn.style.display = "none";
    }
  }

  scrolling(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
