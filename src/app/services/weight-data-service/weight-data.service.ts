import { Injectable } from '@angular/core';
import Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class WeightDataService {
  data: number[] = [];
  labels = []; 

  constructor() { }
}
