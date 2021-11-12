import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CustomerFormsComponent } from './components/customer/customer-forms/customer-forms.component';
import { ButtonComponent } from './components/button/button.component';
import { CustomerGridComponent } from './components/customer/customer-grid/customer-grid.component';
import { CustomerMainComponent } from './components/customer/customer-main/customer-main.component';
import { CustomerDialogComponent } from './components/customer/customer-dialog/customer-dialog/customer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerFormsComponent,
    ButtonComponent,
    CustomerGridComponent,
    CustomerMainComponent,
    CustomerDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
