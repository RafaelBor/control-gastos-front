import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private readonly baseUrl: string = environment.baseUrl;
    private http = inject(HttpClient)

    constructor(){}

    getlist(){
      const url = `${this.baseUrl}/categories`;

      const token = localStorage.getItem('token')

      const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

      return this.http.get<any>(url, {headers})
        .pipe(
          map((res) => res.data),
          catchError(err => {
            return throwError(() => new Error('Error al obtener los datos del servidor'));
          })
        )
    }


    addCategory(data: any){
      const url = `${this.baseUrl}/categories`;

      return this.http.post<any>(url, data, {})
        .pipe(
            map((res) => res.data),
            catchError(err => {
                console.log(err)
                return throwError(() => new Error('Error al obtener los datos del servidor'));
            })
        )
    }

    updateCategory(data: any, id: string){
      const url = `${this.baseUrl}/categories/${id}`;

      return this.http.patch<any>(url, data, {})
        .pipe(
            map((res) => res.data),
            catchError(err => {
                console.log(err)
                return throwError(() => new Error('Error al obtener los datos del servidor'));
            })
        )

    }

}