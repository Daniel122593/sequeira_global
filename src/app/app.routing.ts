import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';



import { AppComponent }    from './app.component';
import { LoginComponent } from './components/login.component';
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
import { SignalDetailComponent } from './components/signal-detail.component';
import { SignalEditComponent } from './components/signal-edit.component';
import { SignalCloseComponent } from './components/signal-close.component';
import { CreateBankPartner } from './components/createBank-partner.component';
import { CreateUserAnalystEmailPassword } from './components/createUserAnalystEmailPassword.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const  appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
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
    { path: 'signalAll', component: SignalAll},
    { path: 'signal-detail/:id', component: SignalDetailComponent},
    { path: 'signal-edit/:id', component: SignalEditComponent},
    { path: 'signal-close/:id', component: SignalCloseComponent},
    { path: 'createBankPartner', component: CreateBankPartner},
    { path: 'createUserAnalystEmailPassword', component: CreateUserAnalystEmailPassword},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);