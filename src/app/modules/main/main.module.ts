import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MainRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class MainModule {}
