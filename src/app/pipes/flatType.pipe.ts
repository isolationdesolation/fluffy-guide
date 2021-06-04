import { Pipe, PipeTransform } from '@angular/core';
import { Flat } from '../flats/flatDataType';

@Pipe({
  name: 'flatTypePipe'
})


export class FlatTypePipe implements PipeTransform {

  transform(flats: Flat[], flatType: string): Flat[] {
    if (flatType === "") {
      return flats;
    }
    return flats.filter(flat => { return flat.category.name === flatType})
    }

    
}
