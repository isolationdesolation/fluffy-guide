import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flat, FlatResponse, Params } from '../flats/flatDataType';
import { categoryId, cityId } from "../flats/facetOptions";
import { share } from 'rxjs/internal/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';





@Injectable()

export class FlatService {

    flat$: Observable<Flat>|undefined;
    flatResponse$: Observable<FlatResponse> | undefined;

    // subject$: Subject<FlatResponse>
    // flatsubject: Subject<Flat>

    

    constructor(private http: HttpClient) {
    }


//     onFormChange(form: FormGroup ): void {
// // params - из данных
//         this.subject$ = this.http.get<FlatResponse>(`https://www.sdvor.com/api/common/flats/`, { params: params })
//     }




    getFlatsWithFacets(form: FormGroup) {
        let raw = form.getRawValue();
        let pageSize = 10;
        let params = new HttpParams();
        

        params = params.append("page_size", `${pageSize}`);
        params = params.append("current_page", `1`)
        if (raw.cities) {
            params = params.append("city_id", raw.cities);
        // }
        // if (parameters.flatCategory) {
        //     params = params.append("category_id__in", categoryId[parameters.flatCategory]);
        // }
        // if (parameters.roomsAmount) {
        //     params = params.append("num_rooms__in", parameters.roomsAmount)
         }
        return this.http.get<FlatResponse>(`https://www.sdvor.com/api/common/flats/`, { params: params })
    }

    getFlatWithId(id: number) {
        return this.http.get<Flat>(`https://www.sdvor.com/api/common/flats/${id}/`).pipe(share())
    }


}