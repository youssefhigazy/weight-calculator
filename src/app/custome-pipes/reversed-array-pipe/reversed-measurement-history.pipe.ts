import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversedMeasurementHistory'
})
export class ReversedMeasurementHistoryPipe implements PipeTransform {

  transform(value: any[]): any[]{
    return value.slice().reverse();
  }

}
