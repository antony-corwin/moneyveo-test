import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDate } from './helpers/custom-date';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";


@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule
  ],
  exports: [
    SliderComponent
  ],
  providers: [
    CustomDate
  ]
})
export class SharedModule {
}
