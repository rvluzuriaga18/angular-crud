import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerService } from "../../../../services/customer/customer.service";
import { CustomerSharedService } from "../../../../services/customer/customer.shared.service";
import { NotificationService } from '../../../../services/notification/notification.service';
import { Customer } from '../../../../interfaces/customer/Customer';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  constructor(
      private customerService: CustomerService, 
      private customerSharedService: CustomerSharedService, 
      private notificationService: NotificationService,
      public dialogRef: MatDialogRef<CustomerDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: Customer
  ) { }

  ngOnInit(): void {}

  onClickNo(): void{
    this.dialogRef.close();
  }
  
  onClickYes(): void{
    this.customerService.deleteCustomer(this.data.customerID).subscribe({
      next: success => {
        if (success){
          this.customerSharedService.sendUpdate(true);
          this.notificationService.success('Customer successfully deleted.', 'Delete Customer');
        }
        else{
          this.notificationService.error('Server error has been encountered. Please contact your system administrator.', 'Delete Customer');
        }
      }
    })
  }
  
}
