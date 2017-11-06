import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item.model';
import { ToastService } from '../../service/toast/toast.service';
import { SqlProvider } from '../../providers/sql/sql';


@IonicPage()
@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage {

  item:Item;
  constructor(private sql:SqlProvider,private toast:ToastService, public navCtrl: NavController, public navParams: NavParams) {
  this.item=this.navParams.get('item');
  }


  editItem(item:Item){
    this.sql.editItem(item).then(()=>{
      this.toast.show(`${item.name} Updated`);
      this.navCtrl.setRoot('HomePage');
    })
    
  }

}
