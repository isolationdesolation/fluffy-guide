import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Flat, FlatResponse} from "../flats/flatDataType";
import { BehaviorSubject } from "rxjs";
import {
  FormGroup
} from "@angular/forms";

@Injectable()
export class FlatService {
  _flat = {} as Flat;
  _flatResponse = {
    count: 0,
    next: null,
    previous: null,
    results: null,
  } as FlatResponse;
  private _flatResponse$ = new BehaviorSubject<FlatResponse>(
    this._flatResponse
  );

  private _flat$ = new BehaviorSubject<Flat>(
    this._flat
  )


  constructor(private http: HttpClient) {}
  get flatResponse$() {
    return this._flatResponse$.asObservable();
  }
  get flat$() {
    return this._flat$.asObservable();

  }

  getFlatsWithFacets(form: FormGroup, currentPage?: string) {
    let raw = form.getRawValue();
    let pageSize = 10;
    let params = new HttpParams();
    const removeFalsy = (obj: any) => {
      let newObj: any = {};
      Object.keys(obj).forEach((prop) => {
        if (obj[prop]) {
          newObj[prop] = obj[prop];
        }
      });
      return newObj;
    };
    let categoriesArr = Object.keys(removeFalsy(raw.categories));
    let roomsArr = Object.keys(removeFalsy(raw.countRooms));

    params = params.append("page_size", `${pageSize}`);
    params = params.append("page", `${currentPage}`)
    if (raw.cities !== undefined) {
      params = params.append("city_id", raw.cities);
    }
    if (categoriesArr) {
      params = params.append("category_id__in", categoriesArr.join());
    }
    if (roomsArr) {
      params = params.append("num_rooms__in", roomsArr.join());
    }
    params.delete("city_id", undefined);
    params.delete("category_id__in", undefined);
    params.delete("num_rooms__in", undefined);

    this.http
      .get<FlatResponse>(`https://www.sdvor.com/api/common/flats/`, {
        params: params,
      })
      .subscribe((data) => {
        this._flatResponse$?.next(data);
      });
  }

  getFlatWithId(id: number) {
    this.http
      .get<Flat>(`https://www.sdvor.com/api/common/flats/${id}/`)
      .subscribe((data) => {
        this._flat$?.next(data);
      });
  }
}