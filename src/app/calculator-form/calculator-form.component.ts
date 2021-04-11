import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { WeightDataService } from '../services/weight-data-service/weight-data.service';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss']
})
export class CalculatorFormComponent implements OnInit {
  constructor(private service: WeightDataService, private toastService: ToastrService) { }
  data: any[] = [];
  count = 0;
  labels: string[] = [];
  formValues = [];
  weightValue: number;
  body: HTMLElement;
  toast: HTMLElement;
  addedToRecordBtnClick = false;

  form = new FormGroup({
    id: new FormControl(''),
    gender: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    heightUnit: new FormControl('', Validators.required),
    height1: new FormControl('', Validators.required),
    height2: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    date: new FormControl(''),
    extra_notes: new FormControl('')
  });

  ngOnInit(): void {
    this.data = [];
    this.labels = [];
    this.listen();
    this.body = document.querySelector('form');
    const storageWeightData = JSON.parse(localStorage.getItem('weight-data'));
    const storageWeightLabels = JSON.parse(localStorage.getItem('weight-labels'));
    const storageCurrentMeasurement = JSON.parse(localStorage.getItem('current-measurement'));
    const storageMeasurementObject = JSON.parse(localStorage.getItem('current-measurement-information'));

    if (storageWeightData !== null){
      this.data = [...storageWeightData];
      this.labels = [...storageWeightLabels];
      this.formValues = [...storageMeasurementObject];
      this.count = storageCurrentMeasurement;
    }
    console.log(storageWeightData);
  }

  onSubmit(): void{
    this.addedToRecordBtnClick = true;
    this.form.get('id').setValue(this.count + 1);
    this.form.get('date').setValue(`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`);
    console.log(this.form.value);
  }

  listen(): void{
    this.form.get('weight').valueChanges.subscribe(res => {
      this.weightValue = parseInt(res);
    });
  }

  onAddRecord(): void{
    this.formValues.push(this.form.value);
    this.data.push(this.weightValue);
    this.count++;
    this.labels.push(String(this.count));
    // this.graph(this.data, this.labels);
    localStorage.setItem('weight-data', JSON.stringify(this.data));
    localStorage.setItem('weight-labels', JSON.stringify(this.labels));
    localStorage.setItem('current-measurement', JSON.stringify(this.count));
    localStorage.setItem('current-measurement-information', JSON.stringify(this.formValues));
    this.toastService.success('The measurement has been added to your record!', 'Congrats! 🎉', {
      timeOut: 5000,
      enableHtml: true,
      tapToDismiss: true,
      toastClass: 'toast-success'
    });
  }
}
