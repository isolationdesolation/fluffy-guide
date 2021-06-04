import { Pipe, PipeTransform } from '@angular/core';
import { Flat } from '../flats/flatDataType';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(flats: Flat[], numberOfRooms: number): Flat[] {
    if (numberOfRooms === 0) {
      return flats;
    }
    return flats.filter(flat => { return flat.numRooms === numberOfRooms})
   
    
    }

}
