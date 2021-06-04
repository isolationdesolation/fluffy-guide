import { Pipe, PipeTransform } from '@angular/core';
import { Flat } from '../flats/flatDataType';

@Pipe({
  name: 'cityPipe'
})


export class CityPipe implements PipeTransform {

  transform(flats: Flat[], cityName: string): Flat[] {
    if (cityName === "Все города" || "") {
      return flats;
    }
    return flats.filter(flat => { return flat.city.name === cityName})
    }

    
}
