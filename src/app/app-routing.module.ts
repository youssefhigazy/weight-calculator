import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecordComponent } from './record/record.component';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'record', component: RecordComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'resources', component: ResourcesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
