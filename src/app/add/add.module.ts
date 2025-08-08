import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoutingModule } from './add-routing.module';

import { CategoryListComponent } from './category/category-list.component';
import { CategoryEditComponent } from './category/category-edit.component';
import { CategoryAddComponent } from './category/category-add.component';
import { ItemListComponent } from './item/item-list.component';
import { ItemEditComponent } from './item/item-edit.component';
import { ItemAddComponent } from './item/item-add.component';
import { BrandListComponent } from './brand/brand-list.component';
import { BrandEditComponent } from './brand/brand-edit.component';

import { StorageLocationListComponent } from './storage-location/storage-location-list.component';
import { StorageLocationEditComponent } from './storage-location/storage-location-edit.component';
import { StorageLocationAddComponent } from './storage-location/storage-location-add.component';

import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
    CategoryListComponent,
    CategoryEditComponent,
    CategoryAddComponent,
    ItemListComponent,
    ItemEditComponent,
    ItemAddComponent,
    BrandListComponent,
    BrandEditComponent,
    StorageLocationListComponent,
    StorageLocationEditComponent,
    StorageLocationAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddRoutingModule
  ]
})
export class AddModule {}
