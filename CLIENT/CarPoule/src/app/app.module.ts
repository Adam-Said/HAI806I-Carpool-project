import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- Add this line
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { NewAccountComponent } from './new-account/new-account.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MatIconModule } from '@angular/material/icon';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { PublishPageComponent } from './publish-page/publish-page.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    NewAccountComponent,
    SearchpageComponent,
    ProfilepageComponent,
    PublishPageComponent,
  ],
  imports: [
    BrowserModule,
    InputTextareaModule,
    ButtonModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatCardModule,
    InputNumberModule,
    MatTabsModule,
    CalendarModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    InputSwitchModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    SelectButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
