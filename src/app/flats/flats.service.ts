import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flat } from './flatDataType';
import { Observable } from 'rxjs';
import { categoryId, cityId } from "./facetOptions"

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getFlatsWithFacets(currentPage: number, city?: string, flatCategory?: string, roomsAmount?: string): Observable<Flat[]> {
        let pageSize = 10;
        let params = new HttpParams();
        params = params.append("page", `${currentPage}`);
        params = params.append("page_size", `${pageSize}`);
        if (city) {
            console.log(city)
            params = params.append("city_id", cityId[city]);
        }
        if (flatCategory) {
            params = params.append("category_id__in", categoryId[flatCategory] );
        }
        if (roomsAmount) {
            params = params.append("num_rooms__in", roomsAmount)
        }
        return this.http.get<Flat[]>(`https://www.sdvor.com/api/common/flats`, {params: params})
    }


}