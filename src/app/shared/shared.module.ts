import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDate } from './helpers/custom-date';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CustomDate
  ]
})
export class SharedModule {
}
