import { Component, OnInit } from '@angular/core';
import { SnackBarService } from "../snack-bar.service";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor(private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  trigger(message:string, action:string)
  {
   this.snackBarService.openSnackBar(message, action);
  }

}
