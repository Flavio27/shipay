import { ItemsService } from './items.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/templates/header/header.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { BodyComponent } from './components/templates/body/body.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/templates/body/modal/modal.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    BodyComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [HttpClientModule, ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
