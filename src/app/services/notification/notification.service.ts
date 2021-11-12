import { Injectable } from '@angular/core';
import { MatSnackBar, 
         MatSnackBarHorizontalPosition, 
         MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  success(message: string, title: string) {
    this.snackBar.open(message, title, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'blue-snackbar'
    });
  }

  error(message: string, title: string) {
    this.snackBar.open(message, title, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'red-snackbar'
    });
  }
}
