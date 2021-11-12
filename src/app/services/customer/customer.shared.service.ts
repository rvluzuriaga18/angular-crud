import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomerClass } from '../../models/Customer/Customer'

@Injectable({
  providedIn: 'root'
})
export class CustomerSharedService {

  private subject = new Subject<any>();

  constructor() { }

  sendUpdate(success: boolean){
    return this.subject.next({isSuccess: success });
  }

  getUpdate(): Observable<any>{
    return this.subject.asObservable();
  }

  sendDetails(cusDetails: CustomerClass){
    return this.subject.next({details: cusDetails });
  }

  getDetails(): Observable<any>{
    return this.subject.asObservable();
  }
  
}
