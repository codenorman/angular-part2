import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InputTextModule,
    ButtonModule,
    ChartModule,
    DataTableModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
