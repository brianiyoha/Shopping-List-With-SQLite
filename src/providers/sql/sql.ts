import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Item } from '../../model/item.model';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SqlProvider {


  db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private sqlite: SQLite, platform:Platform) {
    this.databaseReady = new BehaviorSubject(false);
    platform.ready().then(()=>{
      this.createTable();
    })
    
  }


  createTable(){
    this.sqlite.echoTest().then(e => console.log(e));
    return this.sqlite.create({
      name: "shopping-list.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.databaseReady.next(true);
      let sql: string = "CREATE TABLE IF NOT EXISTS shopping(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,price INTEGER, quantity INTEGER)";
      this.db.executeSql(sql, {})
        .then(work => {console.log(JSON.stringify(work) + `DB CREATED`)})
        .catch(e => console.log(`${e} not created`))

    }).catch(e => console.log(e));
    
    }

    addItem(item: Item){
      let sql= `INSERT INTO shopping(name,price,quantity) values (?,?,?)`;
      return this.db.executeSql(sql,  [item.name , item.price , item.quantity] )
        .then(ref => {

        })
      .catch(e=>{
       
        console.log(JSON.stringify(e));
      });
    }

    data = [];
    getItem(){
      let sql = "SELECT * FROM shopping";
      this.data=[];
      return this.db.executeSql(sql,[])
      .then(data=>{
        for (var i = 0; i < data.rows.length; i++) {
            this.data.push(data.rows.item(i));
         }
        
        return this.data;
      })
      .catch(e=>{
        console.log(`${JSON.stringify(e)}`)
        return [];
      }); 
  }

  editItem(item:Item){
    let sql = `UPDATE shopping set name=?, price=?, quantity=? where id=?`;
    return this.db.executeSql(sql,[item.name,item.price,item.quantity,item.id])
    .then(()=>{
    })
    .catch(e=>{
      console.log(e);
    });
  }

  removeItem(item: Item){
    let sql="DELETE FROM shopping where id=?";
    return this.db.executeSql(sql,[item.id]);

  }
    getDatabaseState() {
      return this.databaseReady.asObservable();
    }
}
