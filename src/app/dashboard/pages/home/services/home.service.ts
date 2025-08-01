import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { Response } from "../../../../commons/interfaces/response.interface";
import { DataMonthResponse } from "../interfaces/data-month-response";


@Injectable({
  providedIn: 'root'
})
export class HomeService {
    private readonly baseUrl: string = environment.baseUrl;
    private http = inject(HttpClient)

    constructor(){}

    getDataCharts(year: string, month: string){
      const url = `${this.baseUrl}/month/data?year=${year}&month=${month}`;

      return this.http.get<Response<DataMonthResponse>>(url, )
        .pipe(
          map((res) => res.data),
          catchError(err => {
            return throwError(() => new Error('Error al obtener los datos del servidor'));
          })
        )
    }


    downloadReport(start: string, end: string){
      const url = `${this.baseUrl}/reports?startDate=${start}&endDate=${end}`;

      return this.http.get(url, { responseType: 'blob'})
        .pipe(
          map((res) => res),
          catchError(err => {
            return throwError(() => new Error('Error al obtener los datos del servidor'));
          })
        )
    }

    initializeMonths(){
      const url = `${this.baseUrl}/month/initialize-months`;

      return this.http.get(url, )
      .pipe(
        map((res) => res),
        catchError(err => {
          return throwError(() => new Error('Error al obtener los datos del servidor'));
        })
      )
    }

}