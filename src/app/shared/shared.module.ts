import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
      BrowserModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatListModule, FormsModule, ReactiveFormsModule, MatRadioModule
  ],
  exports: [
      BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatListModule, FormsModule, ReactiveFormsModule, MatRadioModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
