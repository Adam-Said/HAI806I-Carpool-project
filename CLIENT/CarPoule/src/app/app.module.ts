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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatMenuModule } from '@angular/material/menu';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TripModalComponent } from './trip-modal/trip-modal.component';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PasswordEditPageComponent } from './password-edit-page/password-edit-page.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditPicComponent } from './edit-pic/edit-pic.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    NewAccountComponent,
    SearchpageComponent,
    ProfilepageComponent,
    PublishPageComponent,
    NavbarComponentComponent,
    EditProfileComponent,
    MyTripsComponent,
    TripModalComponent,
    PasswordEditPageComponent,
    FooterComponent,
    MapComponent,
    EditPicComponent,
  ],
  imports: [
    BrowserModule,
    InputTextareaModule,
    ButtonModule,
    AppRoutingModule,
    MatExpansionModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    InputNumberModule,
    AvatarModule,
    MatTabsModule,
    ContextMenuModule,
    CalendarModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    HttpClientModule,
    CardModule,
    AvatarGroupModule,
    InputSwitchModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    SelectButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    LeafletModule,
    MatSnackBarModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
