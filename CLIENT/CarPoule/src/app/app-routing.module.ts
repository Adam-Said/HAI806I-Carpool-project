import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { PublishPageComponent } from './publish-page/publish-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'register', component: NewAccountComponent },
  { path: 'search', component: SearchpageComponent },
  { path: 'profile', component: ProfilepageComponent },
  { path: 'publish', component: PublishPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTabsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
