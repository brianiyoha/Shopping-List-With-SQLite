import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';
import { Item } from '../../model/item.model';
import { ToastService } from '../../service/toast/toast.service';
import { SqlProvider } from '../../providers/sql/sql';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  shoppingList$: any;
  constructor(private sql: SqlProvider,private toast: ToastService, public navCtrl: NavController ) {
    sql.getDatabaseState().subscribe(state=>{
    if(state){
    this.sql.getItem().then(data=>{
     this.shoppingList$ = data;
   });
  }else{
    console.log("DB NOt READY");
  }
    })
  }

  removeItem(item: Item){
    this.sql.removeItem(item)
    .then(()=>{
      this.sql.getItem().then(data => {
        this.shoppingList$ = data;
        this.toast.show(`${item.name} Deleted!`);

      });
    });
  }
}
