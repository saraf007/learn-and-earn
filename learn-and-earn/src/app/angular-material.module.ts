// Angular
import { NgModule } from "@angular/core";

// Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  exports: [
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule
  ]
})
export class AngularMaterialModule {}
