import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Item } from '../../model/item.model';
import { ShoppingListService } from '../../service/shopping-list/shopping-list.service';
import { ToastService } from '../../service/toast/toast.service';
import { SqlProvider } from "../../providers/sql/sql";



@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {

  item: Item={
    name: "",
    quantity: 0,
    price: 0
  };
  constructor(private sqlDB:SqlProvider, private toast:ToastService,private shop: ShoppingListService,public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }

  addItem(item: Item){
    this.toast.show(`Add ${item.name} To Your Shopping List`);
    this.sqlDB.addItem(item).then(ref=>{
      console.log(ref);
      this.navCtrl.setRoot('HomePage', {key: ref});
    });
  }

}
