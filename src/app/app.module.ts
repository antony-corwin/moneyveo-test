import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { FeatureModule } from './feature/feature.module';
import { CalcModule } from "./feature/calc/calc.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    FeatureModule,
    CalcModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
