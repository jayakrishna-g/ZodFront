import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatableComponent } from './matable/matable.component';


const routes: Routes = [{ path: '', component: MatableComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
