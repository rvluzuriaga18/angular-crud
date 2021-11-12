import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from '../../interfaces/customer/Customer';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private apiUrl = environment.apiBaseUrl + "/api/Customer";

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]>{
    const url = `${this.apiUrl}/${'GetAllCustomers'}`
    return this.http.get<Customer[]>(url);
  }

  getCustomerPageList(pageNo: number, pageSize: number): Observable<any>{
    const url = `${this.apiUrl}/${'GetCustomerPageList'}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  addCustomer(customer: Customer): Observable<Customer>{
    const url = `${this.apiUrl}/${'Save'}`
    return this.http.post<Customer>(url, customer, httpOptions);
  }

  updateCustomer(customer: Customer): Observable<Customer>{
    const url = `${this.apiUrl}/${'Update'}`
    return this.http.put<Customer>(url, customer, httpOptions);
  }

  deleteCustomer(customerID: number): Observable<boolean>{
    const url = `${this.apiUrl}/${'Delete'}?id=${customerID}`;
    return this.http.delete<boolean>(url);
  }
  
}
