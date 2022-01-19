import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomerSharedService } from '../../../services/customer/customer.shared.service';
import { Customer } from "../../../interfaces/customer/Customer";
import { CustomerClass } from "../../../models/Customer/Customer";
@Component({
  selector: 'app-customer-forms',
  templateUrl: './customer-forms.component.html',
  styleUrls: ['./customer-forms.component.css']
})
export class CustomerFormsComponent implements OnInit {
  private subcription: Subscription;

  @Output() onAddCustomer: EventEmitter<Customer> = new EventEmitter();
  model: CustomerClass = new CustomerClass();

  customerForm: FormGroup
  maxDate: Date;

  constructor(private customerSharedService: CustomerSharedService) {
    this.getMaxDate();
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      fname: new FormControl(this.model.firstName, [Validators.required]),
      mname: new FormControl(this.model.lastName),
      lname: new FormControl(this.model.lastName, [Validators.required]),
      age: new FormControl(this.model.age),
      bdate: new FormControl(this.model.birthdate, [Validators.required])
    })

    //Subscription for editing
    this.subcription = this.customerSharedService.getDetails().subscribe
      (
        data => {
          if (data.details != null) {
            this.model = Object.assign(this.model, data.details);
          }
        }
      )

    //Disabling of fields
    this.customerForm.controls.age.disable();
  }

  //Reactive Form, get values
  get fname() { return this.customerForm.get('fname')!; }
  get mname() { return this.customerForm.get('mname')!; }
  get lname() { return this.customerForm.get('lname')!; }
  get age() { return this.customerForm.get('age')!; }
  get bdate() { return this.customerForm.get('bdate')!; }

  onSaveCustomer() {
    const customer: Customer = {
      customerID: this.model.customerID,
      firstName: this.model.firstName,
      middleName: this.model.middleName,
      lastName: this.model.lastName,
      age: this.model.age,
      birthdate: this.model.birthdate
    }

    this.onAddCustomer.emit(customer);
    this.model = new CustomerClass();
    this.customerForm.reset();
  }

  onClearForm() {
    this.model = new CustomerClass();
    this.customerForm.reset();
  }

  getMaxDate() {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  }

  setBirthdateForAge(event: any) {
    const dateOfBirth = new Date(event.value);
    const dateToday = new Date();

    var years = (dateToday.getFullYear() - dateOfBirth.getFullYear());

    if (dateToday.getMonth() < dateOfBirth.getMonth() || dateToday.getMonth() == dateOfBirth.getMonth()
      && dateToday.getDate() < dateOfBirth.getDate()) {
      years--;
    }

    this.model.age = years;
  }
}
