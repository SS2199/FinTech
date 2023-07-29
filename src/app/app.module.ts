import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContainerComponent } from './container/container.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { CarosalComponent } from './carosal/carosal.component';

import { HttpClientModule } from '@angular/common/http';
import { PriceComponent } from './price/price.component';
import { CreateJobComponent } from './create-job/create-job.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContainerComponent,
    ProductComponent,
    AboutComponent,
    CarosalComponent,
    PriceComponent,
    CreateJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
