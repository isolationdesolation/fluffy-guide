import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flat, FlatResponse, Params } from '../flats/flatDataType';
import { categoryId, cityId } from "../flats/facetOptions";
import { share } from 'rxjs/internal/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';





@Injectable()

export class FlatService {

    flat$: Subject<Flat> | undefined;
    flatResponse$: Subject<FlatResponse> | undefined;

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
        const removeFalsy = (obj: any) => {
            let newObj: any = {};
            Object.keys(obj).forEach((prop) => {
                if (obj[prop]) { newObj[prop] = obj[prop]; }
            });
            return newObj;
        };
        let categoriesArr = Object.keys(removeFalsy(raw.categories));
        let roomsArr = Object.keys(removeFalsy(raw.countRooms));

        params = params.append("page_size", `${pageSize}`);
        // params = params.append("current_page", `1`)
        if (raw.cities !== undefined) {
            params = params.append("city_id", raw.cities);
        }
        if (categoriesArr) {
            params = params.append("category_id__in", categoriesArr.join());
        }
        if (roomsArr) {
            params = params.append("num_rooms__in", roomsArr.join())
        }
        params.delete("city_id", undefined)
        params.delete("category_id__in", undefined)
        params.delete("num_rooms__in", undefined)

        this.http.get<FlatResponse>(`https://www.sdvor.com/api/common/flats/`, {params: params}).subscribe(this.flatResponse$)
    }

    getFlatWithId(id: number) {
        return this.http.get<Flat>(`https://www.sdvor.com/api/common/flats/${id}/`).pipe(share())
    }


}