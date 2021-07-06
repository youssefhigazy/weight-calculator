import { Injectable } from '@angular/core';
import Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class WeightDataService {
  height: number;
  weight: number;
  weightUnit: string;

  constructor() { }

  calcExtraWeight(weightValue, weightUnit, heightValue1, heightValue2, heightUnit){
    const convertPoundsToKilograms = 2.205;
    const convertFeetToMeters = 3.281;
    const convertInchToMeters = 39.37;
    const convertCentimetersToMeters = 100;

    let weight: number;
    let height: number;
    let bmi: number;

    if (weightUnit == "pounds") weight = parseFloat(weightValue) / convertPoundsToKilograms;
    else if (weightUnit === "kilograms") weight = parseFloat(weightValue);

    this.weight = weight;
    this.weightUnit = weightUnit;

    if (heightUnit == "imperial") {
      let height1 = parseFloat(heightValue1) / convertFeetToMeters;
      let height2 = parseFloat(heightValue2) / convertInchToMeters;

      height = height1 + height2;
      this.height = height;
    }
    else if (heightUnit == "metric") {
      let height1 = parseFloat(heightValue1);
      let height2 = parseFloat(heightValue2) / convertCentimetersToMeters;
      
      height = height1 + height2;
      this.height = height;
    }

    bmi = weight / Math.pow(height, 2);

    return bmi;
  }

  weightDescription(bmi){
    let description: string;

    if (bmi < 18.5) description = "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) description = "Normal";
    else if (bmi >= 25 && bmi <= 29.9) description = "Overweight";
    else if (bmi >= 30 && bmi <= 34.9) description = "Obese";
    else if (bmi >= 35) description = "Extremely Obese";

    return description;
  }

  calculateIdealWeight(height: number){
    const convertKilogramToPound = 2.20462;
    const idealBMI = 24.9;
    let idealWeight = idealBMI * Math.pow(height, 2);
    
    if (this.weightUnit === "pounds") idealWeight = idealWeight * convertKilogramToPound;
    
    return idealWeight;
  }
  
  calculateWeightToLose(weight: number){
    const convertKilogramToPound = 2.20462;
    let weightToLoss = weight - this.calculateIdealWeight(this.height);
    
    if (weightToLoss <= 0) weightToLoss = 0;
    if (this.weightUnit === "pounds") weightToLoss = weightToLoss * convertKilogramToPound;

    return weightToLoss;
  }
}
