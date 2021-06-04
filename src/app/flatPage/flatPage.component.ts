import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flat } from "../flats/flatDataType";
import { HttpClient } from '@angular/common/http';



@Component({
    selector: 'flat-details',
    templateUrl: './flatPage.component.html',
    styleUrls: ['./flatPage.component.css'],

})

export class FlatPageComponent implements OnInit {
    flat: Flat | undefined

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const flatIdFromRoute = Number(routeParams.get('id'));
        this.http.get(`https://www.sdvor.com/api/common/flats/${flatIdFromRoute}`).subscribe((data: any) => this.flat=data);
    }
}