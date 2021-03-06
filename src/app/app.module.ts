import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './layout/header/header.component';
import { CalculatorFormComponent } from './calculator-form/calculator-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordComponent } from './record/record.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ReversedMeasurementHistoryPipe } from './custome-pipes/reversed-array-pipe/reversed-measurement-history.pipe';
import { BackBtnComponent } from './back-btn/back-btn.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ScrollUpBtnComponent } from './scroll-up-btn/scroll-up-btn.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    CalculatorFormComponent,
    RecordComponent,
    MeasurementComponent,
    ReversedMeasurementHistoryPipe,
    BackBtnComponent,
    AboutUsComponent,
    ScrollUpBtnComponent,
    FooterComponent,
    ResourcesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
