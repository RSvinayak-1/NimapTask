import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../app/category/category.component';
import { ProductComponent } from '../app/product/product.component';
import { ListDisplayComponent } from "../app/list-display/list-display.component";

const routes: Routes = [{
  path: '', component: CategoryComponent
},
{
  path: 'product', component: ProductComponent
},
{
  path: 'list', component: ListDisplayComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
