import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flat, FlatResponse, Params } from '../flats/flatDataType';
import { categoryId, cityId } from "../flats/facetOptions";
import { share } from 'rxjs/internal/operators';



@Injectable()

export class FlatService {

    constructor(private http: HttpClient) {
    }



    getFlatsWithFacets(parameters: Params) {

        let pageSize = 10;
        let params = new HttpParams();
        params = params.append("page_size", `${pageSize}`);
        params = params.append("current_page", `${parameters.currentPage}`)
        if (parameters.city) {
            params = params.append("city_id", cityId[parameters.city]);
        }
        if (parameters.flatCategory) {
            params = params.append("category_id__in", categoryId[parameters.flatCategory]);
        }
        if (parameters.roomsAmount) {
            params = params.append("num_rooms__in", parameters.roomsAmount)
        }
        return this.http.get<FlatResponse>(`https://www.sdvor.com/api/common/flats/`, { params: params }).pipe(share())
    }

    getFlatWithId(id: number) {
        return this.http.get<Flat>(`https://www.sdvor.com/api/common/flats/${id}/`).pipe(share())
    }


}