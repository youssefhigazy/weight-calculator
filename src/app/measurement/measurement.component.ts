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
    this.measurements = JSON.parse(localStorage.getItem("current-measurement-information"));
    this.weights = JSON.parse(localStorage.getItem("weight-data"));
    console.log(Object.keys(this.measurements[0]));
  }

  export(index?: number){
    let weightBook = new Workbook();
    let worksheet = weightBook.addWorksheet("Weight measurement");
    
    worksheet.columns = [
      { header: "Measurement Number", key:"measurement_number", width: 20 },
      { header: "Gender", key:"gender", width: 8 },
      { header: "Height Unit", key:"height_unit", width: 13 },
      { header: "Height 1 (Feets / Meters)", key:"height1", width: 28 },
      { header: "Height 2 (Inches / Centimeters)", key:"height2", width: 33 },
      { header: "Weight Measureing Unit", key:"weight_unit", width: 24 },
      { header: "Weight (Pounds / Kilograms)", key:"weight", width: 30 },
      { header: "Date", key:"date", width: 30 },
    ]

    // Adding blank row to separate the header and the rows
    worksheet.addRow({});

    if (index !== undefined){
      let measurement = this.measurements[index];
      worksheet.addRow({measurement_number: measurement.id,
                        gender: measurement.gender, 
                        height_unit: measurement.heightUnit, 
                        height1: measurement.height1,
                        height2: measurement.height2,
                        weight_unit: measurement.unit,
                        weight: measurement.weight,
                        date: measurement.date})
    } else {
      this.measurements.forEach(measurement => {
        worksheet.addRow({measurement_number: measurement.id,
                          gender: measurement.gender, 
                          height_unit: measurement.heightUnit, 
                          height1: measurement.height1,
                          height2: measurement.height2,
                          weight_unit: measurement.unit,
                          weight: measurement.weight,
                          date: measurement.date})
      })
    }
    
    weightBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Weight-measurement.xlsx');
    })

    console.log(index);
  }
}
