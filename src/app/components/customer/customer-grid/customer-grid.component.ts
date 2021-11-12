import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { CustomerService } from "../../../services/customer/customer.service";
import { CustomerSharedService } from '../../../services/customer/customer.shared.service';
import { Customer } from "../../../interfaces/customer/Customer";
import { CustomerClass } from "../../../models/Customer/Customer"
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog/customer-dialog.component';
@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.css']
})
export class CustomerGridComponent implements OnInit {
  private subcription: Subscription;
  dataSource = new MatTableDataSource<Customer[]>();

  displayedColumns: string[] = ['customerID','firstName', 'middleName' ,'lastName','age', 'birthdate', 'operations'];
  pageSizeOptions: number[] = [10, 25, 50];
  pageNo: number = 1;
  pageSize: number = 10;
  totalCount: number;

  constructor(private customerService: CustomerService,
              private customerSharedService: CustomerSharedService,
              public  dialog: MatDialog) {

      this.subcription = this.customerSharedService.getUpdate().subscribe
      (data => {
        if (data.isSuccess){
          this.getCustomerList(this.pageNo, this.pageSize);
        } 
      })
  }

  ngOnInit(): void {
      this.getCustomerList();
  }

  getCustomerList(pageNo: number = 1, pageSize: number = 10){
    this.customerService.getCustomerPageList(pageNo, pageSize)
      .subscribe((data) => {
          this.dataSource.data = data.result;
          this.totalCount = data.totalCount;
      });
  }

  getRecordForDeletion(row: CustomerClass){
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '250px',
      data: {
          customerID: row.customerID,
          firstName: row.firstName,
          middleName: row.middleName,
          lastName: row.lastName
        },
    })
  }

  getRecord(row: any){
    this.customerSharedService.sendDetails(row);
  }

  getPaginatorData(pageEvent: PageEvent){
    if(pageEvent.pageIndex == 0){
      this.pageNo = 1;
    }
    else{
      this.pageNo = pageEvent.pageIndex + 1;
    }

    this.pageSize = pageEvent.pageSize;

    this.getCustomerList(this.pageNo, this.pageSize);
  }
}


