import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flat } from '../flats/flatDataType';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getFlatWithId(id: string): Observable<Flat[]> {
        return this.http.get<Flat[]>(`https://www.sdvor.com/api/common/flats/${id}`)
    }


}