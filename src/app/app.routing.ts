import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';



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
import { UserAdministrativeEdit } from './components/userAdministrative-edit.component';
import { CreateUserAnalyst } from './components/createUserAnalyst.component';
import { UserAnalystDetail } from './components/userAnalyst-detail.component';
import { UserAnalystEdit } from './components/userAnalyst-edit.component';
import { FinanceComponent } from './components/finance.component';
import { UserPartnerDetail } from './components/userPartner-detail.component';
import { UserPartnerEdit } from './components/userPartner-edit.component';


const  appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
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
    { path: 'signalAll', component: SignalAll},
    { path: 'signal-detail/:id', component: SignalDetailComponent},
    { path: 'signalClose-detail/:id', component: SignalCloseDetailComponent},
    { path: 'signal-edit/:id', component: SignalEditComponent},
    { path: 'signal-close/:id', component: SignalCloseComponent},
    { path: 'createBankPartner', component: CreateBankPartner},
    { path: 'createUserAnalystEmailPassword', component: CreateUserAnalystEmailPassword},
    { path: 'createUserAdministrative', component: CreateUserAdministrative},
    { path: 'userAdministrative-detail/:id', component: UserAdministrativeDetail},
    { path: 'userAdministrative-edit/:id', component: UserAdministrativeEdit},
    { path: 'createUserAnalyst', component: CreateUserAnalyst},
    { path: 'userAnalyst-detail/:id', component: UserAnalystDetail},
    { path: 'userAnalyst-edit/:id', component: UserAnalystEdit},
    { path: 'finance', component: FinanceComponent},
    { path: 'user_partner-detail/:id', component: UserPartnerDetail},
    { path: 'user_partner-edit/:id', component: UserPartnerEdit},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);