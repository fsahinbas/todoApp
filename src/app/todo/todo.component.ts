import { TodoItem } from './../todoitem';
import { Component, OnInit } from '@angular/core';
import { Model } from '../model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent   {

  displayAll:boolean=false;
  inputDesc:string="";


  constructor() {
    this.model.items=this.getItemsFromLocalST();
  }

  model=new Model();

  addItem(){
    if(this.inputDesc!=""){
      let data={"description":this.inputDesc,"action":false};
      this.model.items.push(data);
      let items=this.getItemsFromLocalST();
      items.push(data);
      localStorage.setItem("items",JSON.stringify(items))
      this.inputDesc="";
    }
    else{
      alert("Bilgi giriniz...");
    }
  }

  getItemsFromLocalST(){
    let items:TodoItem[]=[];
    let val=localStorage.getItem("items");
    if (val!=null){
      items=JSON.parse(val);
    }
    return items;
  }
  getName(){
    return this.model.name;
  }

  getItems(){
    if (this.displayAll) {
      return this.model.items;
    }
    else{
      return this.model.items.filter(item=>!item.action)
    }
  }

  getCount(){
    return this.model.items.filter(i=>i.action).length;
  }

  getBtnClass(){
    return {
      'btn-secondary disabled': this.inputDesc.length == 0,
      'btn-primary': this.inputDesc.length > 0
    };
  }

  changeAction(item:TodoItem){
    let items=this.getItemsFromLocalST();
    localStorage.clear();
    items.forEach(i=>{
      if(i.description==item.description){
        i.action=item.action;
      }
    });
    localStorage.setItem("items",JSON.stringify(items));
  }
}
