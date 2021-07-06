import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

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
    this.measurements = JSON.parse(localStorage.getItem('current-measurement-information'));
    this.weights = JSON.parse(localStorage.getItem('weight-data'));
  }

  export(index?: number): void{
    const weightBook = new Workbook();
    const worksheet = weightBook.addWorksheet('Weight measurement');

    worksheet.columns = [
      { header: 'Measurement Number', key: 'measurement_number', width: 20 },
      { header: 'Gender', key: 'gender', width: 8 },
      { header: 'Height Unit', key: 'height_unit', width: 13 },
      { header: 'Height 1 (Feets / Meters)', key: 'height1', width: 28 },
      { header: 'Height 2 (Inches / Centimeters)', key: 'height2', width: 33 },
      { header: 'Weight Measureing Unit', key: 'weight_unit', width: 24 },
      { header: 'Weight (Pounds / Kilograms)', key: 'weight', width: 30 },
      { header: 'Date', key: 'date', width: 30 },
      { header: 'BMI (Body Mass Index)', key: 'bmi', width: 24 },
      { header: 'BMI Evaluation', key: 'weight_description', width: 30 },
      { header: 'Ideal Weight', key: 'ideal_weight', width: 30 },
      { header: 'Weight To Lose (if applicable)', key: 'weight_to_lose', width: 38 },
      { header: 'Additional notes (if applicable)', key: 'notes', width: 34 },
    ];

    // Adding blank row to separate the header and the rows
    worksheet.addRow({});

    if (index !== undefined){
      const measurement = this.measurements[this.measurements.length - (index + 1)];
      worksheet.addRow({measurement_number: measurement.id,
                        gender: measurement.gender,
                        height_unit: measurement.heightUnit,
                        height1: parseInt(measurement.height1),
                        height2: parseInt(measurement.height2),
                        weight_unit: measurement.unit,
                        weight: `${parseFloat(measurement.weight)} ${measurement.unit}`,
                        date: measurement.date,
                        bmi: measurement.bmi,
                        weight_description: measurement.weight_description,
                        ideal_weight: `${measurement.ideal_weight.toFixed(4)} ${measurement.unit}`,
                        weight_to_lose: `${measurement.weight_to_lose.toFixed(4)} ${measurement.unit}`,
                        notes: measurement.extra_notes});
    } else {
      this.measurements.forEach(measurement => {
        worksheet.addRow({measurement_number: measurement.id,
                          gender: measurement.gender,
                          height_unit: measurement.heightUnit,
                          height1: parseInt(measurement.height1),
                          height2: parseInt(measurement.height2),
                          weight_unit: measurement.unit,
                          weight: `${parseFloat(measurement.weight)} ${measurement.unit}`,
                          date: measurement.date,
                          bmi: measurement.bmi,
                          weight_description: measurement.weight_description,
                          ideal_weight: `${measurement.ideal_weight.toFixed(4)} ${measurement.unit}`,
                          weight_to_lose: `${measurement.weight_to_lose.toFixed(4)} ${measurement.unit}`,
                          notes: measurement.extra_notes});
      });
    }

    weightBook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Weight-measurement.xlsx');
    });

  }
}
