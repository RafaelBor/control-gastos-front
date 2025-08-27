import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "../../../../commons/interfaces/response.interface";
import { Expense } from "../../home/interfaces/expense.interface";
import { catchError, map, throwError } from "rxjs";
import { ExpensesByDayResponse } from "../../home/interfaces/list-expenses-by-day.interface";


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

    private readonly baseUrl: string = environment.baseUrl;
    private readonly http = inject(HttpClient)
    
    constructor(){}

    getListExpensesByDate(date: string){
        const url = `${this.baseUrl}/expenses/${date}`;
        
        const token = localStorage.getItem('token')
        
        const headers = new HttpHeaders()
                .set('Authorization', `Bearer ${token}`);
        
        return this.http.get<Response<ExpensesByDayResponse>>(url, {headers})
            .pipe(
            map((res) => res.data),
            catchError(err => {
                console.log(err)
                return throwError(() => new Error('Error al obtener los datos del servidor'));
            })
        )
    }

    saveExpense(data: any){
        const url = `${this.baseUrl}/expenses/add`;
        
        const token = localStorage.getItem('token')
        
        const headers = new HttpHeaders()
                .set('Authorization', `Bearer ${token}`);

        return this.http.post<any>(url, data, {headers})
                .pipe(
                    map((res) => res.data),
                    catchError(err => {
                        console.log(err)
                        return throwError(() => new Error('Error al obtener los datos del servidor'));
                    })
                )
    }


     getExpenseById(id: string){
        const url = `${this.baseUrl}/expenses/byId/${id}`;
        
        const token = localStorage.getItem('token')
        
        const headers = new HttpHeaders()
                .set('Authorization', `Bearer ${token}`);
        
        return this.http.get<Response<Expense>>(url, {headers})
            .pipe(
            map((res) => res.data),
            catchError(err => {
                console.log(err)
                return throwError(() => new Error('Error al obtener los datos del servidor'));
            })
        )
    }

    updateExpense(data: any, idExpense: string){
         const url = `${this.baseUrl}/expenses/${idExpense}`;
        
        const token = localStorage.getItem('token')
        
        const headers = new HttpHeaders()
                .set('Authorization', `Bearer ${token}`);

        return this.http.put<any>(url, data, {headers})
                .pipe(
                    map((res) => res.data),
                    catchError(err => {
                        console.log(err)
                        return throwError(() => new Error('Error al obtener los datos del servidor'));
                    })
                )
    }

    deleteExpense(idExpense: string){
         const url = `${this.baseUrl}/expenses/${idExpense}`;
        return this.http.delete<any>(url, {})
            .pipe(
                map((res) => res.data),
                catchError(err => {
                    console.log(err)
                    return throwError(() => new Error('Error al obtener los datos del servidor'));
                })
            )
    }
}