import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "../../../../commons/interfaces/response.interface";
import { Expense } from "../../home/interfaces/expense.interface";
import { catchError, map, throwError } from "rxjs";
import { ExpensesByDayResponse } from "../../home/interfaces/list-expenses-by-day.interface";
import { UserInfo } from "../interfaces/user-info.interface";
import { RequestUpdateSalaryMonth } from "../interfaces/request-update-month.interface";


@Injectable({
  providedIn: 'root'
})
export class SalaryService {

    private readonly baseUrl: string = environment.baseUrl;
    private http = inject(HttpClient)
    
    constructor(){}

    getUserInfo(){
        const url = `${this.baseUrl}/auth/user-info`;
        
        return this.http.get<Response<UserInfo>>(url)
            .pipe(
            map((res) => res.data),
            catchError(err => {
                console.log(err)
                return throwError(() => new Error('Error al obtener los datos del servidor'));
            })
        )
    }

    updateSalary(salary: any){
        const url = `${this.baseUrl}/salary/update`;

        return this.http.patch<Response<null>>(url, salary)
            .pipe(
                map((res) => res.data),
                catchError(err => {
                    console.log(err)
                    return throwError(() => new Error('Error al obtener los datos del servidor'));
                })
            )
    }

    updateSalaryByMonth(request: RequestUpdateSalaryMonth){
        const url = `${this.baseUrl}/month/update-salary`;

        return this.http.patch<Response<null>>(url, request)
        .pipe(
            map((res) => res.data),
            catchError(err => {
                console.log(err)
                return throwError(() => new Error('Error al obtener los datos del servidor'));
            })
        )
    }
}