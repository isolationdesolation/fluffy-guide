import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Flat} from './flats/flatDataType';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
   
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
        
    getFlatsData() : Observable<Flat[]> {
        return this.http.get('https://www.sdvor.com/api/common/flats').pipe(map((data:any)=>{
            let flatList = data["results"];
            return flatList.map(function(flat: any): Flat {
                return new (flat.id, flat.address, flat.category.name);
              });
        }));
    }
 
}