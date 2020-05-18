import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MusicTableComponent } from './music-table/music-table.component';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort'

import {MatButtonModule} from '@angular/material/button';

import {MatMenuModule} from '@angular/material/menu'



@NgModule({
  declarations: [
    AppComponent,
    MusicTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
