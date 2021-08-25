import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalcControlsComponent } from "./calc-controls/calc-controls.component";
import { CalcDetailsComponent } from "./calc-details/calc-details.component";
import { CalcComponent } from './calc.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule } from "@angular/forms";
import localeRu from '@angular/common/locales/ru';
import { SharedModule } from "../../shared/shared.module";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    CalcControlsComponent,
    CalcDetailsComponent,
    CalcComponent],
  exports: [
    CalcComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ]
})
export class CalcModule {
}
