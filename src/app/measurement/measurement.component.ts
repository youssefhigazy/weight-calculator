import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {
  measurements: any[];
  weights: any[];
  constructor() { }

  ngOnInit(): void {
    this.measurements = JSON.parse(localStorage.getItem("current-measurement-information"));
    this.weights = JSON.parse(localStorage.getItem("weight-data"));
  }

}
