import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NominateComponent } from "./nominate/nominate.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "nominate"},
  {path: "nominate", component: NominateComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
