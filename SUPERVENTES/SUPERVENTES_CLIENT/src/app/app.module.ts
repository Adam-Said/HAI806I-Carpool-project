import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';	

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationService } from './authentification.service';
import { ProduitsService } from './produits.service';

import { ConnexionComponent } from './connexion/connexion.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component'

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    ProduitsComponent,
    CategoriesComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthentificationService, ProduitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
