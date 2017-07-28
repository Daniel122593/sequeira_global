import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { UploadService } from './uploads/shared/upload.service';
import { UploadRService } from './uploads/shared/uploadR.service';

import { ServicesInfo } from './services/services_info.services';
import { routing, appRoutingProviders} from './app.routing';

import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';

import { FormsModule } from "@angular/forms";

import { AppComponent }    from './app.component';
import { LoginComponent } from './components/login.component';
import { SignalComponent } from './components/signals.component';
import { CreateSignalComponent } from './components/createSignal.component';
import { UsersComponent } from './components/users.component';
import { HomeComponent } from './components/home.component';
import { UserAnalystPrincipal } from './components/userAnalyst.component';
import { CreateUser } from './components/createUser.component';
import { ClientUser } from './components/clientUser';
import { PreferredUser } from './components/preferredUser.component';
import { CreatePartner } from './components/createPartner.component';
import { SignalMonth } from './components/signalMonth.component';
import { SignalAll } from './components/signalAll.component';
import { SignalDetailComponent } from './components/signal-detail.component';
import { SignalCloseDetailComponent } from './components/signalClose-detail.component';
import { SignalEditComponent } from './components/signal-edit.component';
import { SignalCloseComponent } from './components/signal-close.component';
import { CreateBankPartner } from './components/createBank-partner.component';
import { CreateUserAnalystEmailPassword } from './components/createUserAnalystEmailPassword.component';
import { CreateUserAdministrative } from './components/createUserAdministrative.component';
import { UserAdministrativeDetail } from './components/userAdministrative-detail.component';
import { CreateUserAnalyst } from './components/createUserAnalyst.component';
import { UserAnalystDetail } from './components/userAnalyst-detail.component';
import { UserAnalystEdit } from './components/userAnalyst-edit.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MyMissingTranslationHandler } from './missingtemplate.component';
import { UserAdministrativeEdit } from './components/userAdministrative-edit.component';
import { FinanceComponent } from './components/finance.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp (environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    routing,
    RouterModule.forRoot([
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'signal', component: SignalComponent},
    { path: 'createSignal', component: CreateSignalComponent},
    { path: 'users', component: UsersComponent},
    { path: 'userAnalyst', component: UserAnalystPrincipal},
    { path: 'createUser', component: CreateUser},
    { path: 'clientUser', component: ClientUser},
    { path: 'preferredUser', component: PreferredUser},
    { path: 'createPartner', component: CreatePartner},
    { path: 'signalMonth', component: SignalMonth},
    { path: 'signalAll', component:SignalAll},
    { path: 'signal-detail/:id', component:SignalDetailComponent},
    { path: 'signalClose-detail/:id', component: SignalCloseDetailComponent},
    { path: 'signal-edit/:id', component:SignalEditComponent},
    { path: 'signal-close/:id', component:SignalCloseComponent},
    { path: 'createBankPartner', component:CreateBankPartner},
    { path: 'createUserAnalystEmailPassword', component: CreateUserAnalystEmailPassword},
    { path: 'createUserAdministrative', component: CreateUserAdministrative},
    { path: 'userAdministrative-detail/:id', component: UserAdministrativeDetail},
    { path: 'userAdministrative-edit/:id', component: UserAdministrativeEdit},
    { path: 'createUserAnalyst', component: CreateUserAnalyst},
    { path: 'userAnalyst-detail/:id', component: UserAnalystDetail},
    { path: 'userAnalyst-edit/:id', component: UserAnalystEdit},
    { path: 'finance', component: FinanceComponent},
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
    LoginComponent,
    SignalComponent,
    CreateSignalComponent,
    UsersComponent,
    UserAnalystPrincipal,
    CreateUser,
    ClientUser,
    PreferredUser,
    CreatePartner,
    SignalMonth,
    SignalAll,
    SignalDetailComponent,
    SignalCloseDetailComponent,
    SignalEditComponent,
    SignalCloseComponent,
    CreateBankPartner,
    CreateUserAnalystEmailPassword,
    CreateUserAdministrative,
    UserAdministrativeDetail,
    UserAdministrativeEdit,
    CreateUserAnalyst,
    UserAnalystDetail,
    UserAnalystEdit,
    HomeComponent,
    FinanceComponent
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    UploadService,
    UploadRService,
    ServicesInfo,
    { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
