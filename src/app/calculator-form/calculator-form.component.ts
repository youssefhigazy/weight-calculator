import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js';
import { WeightDataService } from '../services/weight-data-service/weight-data.service';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss']
})
export class CalculatorFormComponent implements OnInit {
  data: any[] = [];
  count: number = 0;
  labels: string[] = [];
  formValues = [];
  weightValue: number;
  body: HTMLElement;
  toast: HTMLElement = document.querySelector(".toast");
  addedToRecordBtnClick: boolean;
  constructor(private service: WeightDataService) { }

  ngOnInit(): void {
    this.data = [];
    this.labels = [];
    this.listen();
    this.body = document.querySelector("form");
    let storageWeightData = JSON.parse(localStorage.getItem("weight-data"));
    let storageWeightLabels = JSON.parse(localStorage.getItem("weight-labels"));
    let storageCurrentMeasurement = JSON.parse(localStorage.getItem("current-measurement"));
    let storageMeasurementObject = JSON.parse(localStorage.getItem("current-measurement-information"));

    if (storageWeightData !== null){
      this.data = [...storageWeightData];
      this.labels = [...storageWeightLabels];
      this.formValues = [...storageMeasurementObject];
      this.count = storageCurrentMeasurement;
    }
    console.log(storageWeightData);
  } 

  form = new FormGroup({
    "gender": new FormControl('', Validators.required),
    "unit": new FormControl('', Validators.required),
    "height-unit": new FormControl('', Validators.required),
    "height1": new FormControl('', Validators.required),
    "height2": new FormControl('', Validators.required),
    "weight": new FormControl('', Validators.required)
  })

  onSubmit(){
    console.log(this.form.value);
    this.formValues.push(this.form.value);
  }

  listen(){
    this.form.get("weight").valueChanges.subscribe(res => {
      this.weightValue = parseInt(res);
    })
  }

  onAddRecord(){
    this.addedToRecordBtnClick = true;
    this.data.push(this.weightValue);
    this.count++;
    this.labels.push(String(this.count));
    // this.graph(this.data, this.labels);
    localStorage.setItem("weight-data", JSON.stringify(this.data));
    localStorage.setItem("weight-labels", JSON.stringify(this.labels));
    localStorage.setItem("current-measurement", JSON.stringify(this.count));
    localStorage.setItem("current-measurement-information", JSON.stringify(this.formValues));
  }
}
