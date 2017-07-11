import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';

import { FormsModule } from "@angular/forms";

import { AppComponent }    from './app.component';
import { SignalComponent } from './components/signals.component';
import { CreateSignalComponent } from './components/createSignal.component';
import { UsersComponent } from './components/users.component';
import { HomeComponent } from './components/home.component';
import { UserAnalyst } from './components/userAnalyst.component';
import { CreateUser } from './components/createUser.component';
import { ClientUser } from './components/clientUser';
import { PreferredUser } from './components/preferredUser.component';
import { CreatePartner } from './components/createPartner.component';
import { SignalMonth } from './components/signalMonth.component';
import { SignalAll } from './components/signalAll.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MyMissingTranslationHandler } from './missingtemplate.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
    { path: 'home', component: HomeComponent},
    { path: 'signal', component: SignalComponent},
    { path: 'createSignal', component: CreateSignalComponent},
    { path: 'users', component: UsersComponent},
    { path: 'userAnalyst', component: UserAnalyst},
    { path: 'createUser', component: CreateUser},
    { path: 'clientUser', component: ClientUser},
    { path: 'preferredUser', component: PreferredUser},
    { path: 'createPartner', component: CreatePartner},
    { path: 'signalMonth', component: SignalMonth},
    { path: 'signalAll', component:SignalAll},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }

    ]),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ 
    AppComponent,
    SignalComponent,
    CreateSignalComponent,
    UsersComponent,
    UserAnalyst,
    CreateUser,
    ClientUser,
    PreferredUser,
    CreatePartner,
    SignalMonth,
    SignalAll,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  providers: [
    { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
