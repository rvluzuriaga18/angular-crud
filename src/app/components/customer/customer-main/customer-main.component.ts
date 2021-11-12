import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from "../../../services/customer/customer.service";
import { CustomerSharedService } from '../../../services/customer/customer.shared.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Customer } from "../../../interfaces/customer/Customer";

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {
  
  constructor(private customerService: CustomerService, 
              private customerSharedService: CustomerSharedService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {}

  manageCustomer(customer: Customer){
    if(customer.customerID == undefined){
          this.customerService.addCustomer(customer).subscribe({
            next: success => {
              if (success){
                this.customerSharedService.sendUpdate(true);
                this.notificationService.success('Customer successfully saved.', 'Add Customer');
              }
              else{
                this.notificationService.error('Server error has been encountered. Please contact your system administrator.', 'Add Customer');
              }
            }
        })
    }
    else{
        this.customerService.updateCustomer(customer).subscribe({
          next: success => {
            if (success){
              this.customerSharedService.sendUpdate(true);
              this.notificationService.success('Customer successfully updated.', 'Edit Customer');
            }
            else{
              this.notificationService.error('Server error has been encountered. Please contact your system administrator.', 'Add Customer');
            }
          }
      })
    }
  } //manageCustomer
}
