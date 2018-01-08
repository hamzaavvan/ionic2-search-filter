import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import 'rxjs/add/operator/debounceTime';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Data],
})

export class HomePage {
  searchTerm: string = '';
  searchControl: Control;
  searching: boolean = false;
  items: any;

  constructor(public navCtrl: NavController, private dataService: Data) {
  		this.searchControl = new Control();
  }

  ionViewLoaded() {
  		this.setFilteredItems();

  		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
  			this.searching = false
  			this.setFilteredItems();
  		});
  }

  onSearchInput() {
  		this.searching = true;
  }

  setFilteredItems() {
  		this.items = this.dataService.filterItems(this.searchTerm);
  }
}
