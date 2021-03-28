import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { Imagem } from 'src/app/dashboard/models/imagem';
import { Item } from 'src/app/dashboard/models/item';
import { ItemService } from 'src/app/dashboard/services/item.service';
import { DialogComponent } from 'src/app/dashboard/utils/dialog/dialog.component';

@Component({
  selector: 'app-cad-item',
  templateUrl: './cad-item.component.html',
  styleUrls: ['./cad-item.component.css']
})
export class CadItemComponent implements OnInit {
  itemForm:FormGroup = this.fb.group({
    _id:[null],
    titulo:[''],
    linkResource:[''],
    imagem:[null],
    item:[null],
    subitem:[null],
    categoria:[null],
    createdAt:[''],
    __v:['']
 

  })
  imagem:Imagem = null
  Items:Item[]=[]
  listaItemSelect:Item[]=[]
  private unsubscribe$: Subject<any> = new Subject()
  constructor(private fb:FormBuilder , private itemService:ItemService, private snackBar:MatSnackBar,  private dialog: MatDialog) { }

  ngOnInit(): void {
    this.itemService.get().pipe(takeUntil(this.unsubscribe$)).subscribe((items)=>{
      this.Items = items
     
    })

  }
  save(){
   
    this.itemForm.patchValue({
      imagem: this.imagem, 
      item: this.listaItemSelect,
     
    });
   

   
  
    let dados = this.itemForm.value

      console.log(dados)
  
      if(dados._id != null){ 
      
        this.itemService.update(dados).subscribe(
          (items)=>{
            this.notify("Alterado com sucesso")
          },
          (err)=>{
            this.notify("erro não pode cadastrar item sobre itens que já tem subitem ")
            this.listaItemSelect.pop()
          }
        )
      
      }else{ 
        console.log("aqui lista de items"+this.listaItemSelect.length)
      console.log("Imagem  "+this.imagem?._id)
        if((this.imagem != undefined && this.imagem !=null) || this.listaItemSelect.length > 0){
      
        this.itemService.add(dados).subscribe()
        this.resetForm()
        this.notify("Cadastrado com sucesso")
      }else{
        this.notify("Escolha uma imagem")
      }
    }


  }
  delete(item:Item){
    console.log(item)
    const dialogo = this.dialogo()
    dialogo.afterClosed().subscribe((confirmar:boolean)=>{
      if(confirmar){
      
        this.itemService.del(item).subscribe(()=>{
          this.notify("Deletado!")
        },
        (err)=>{
          this.notify("Error ao deletar ")
          console.log(err.message)
        })
      }
    })
   
  }
  async edit(item:Item){


    this.itemForm.patchValue({
      imagem: this.imagem, 
      item: this.listaItemSelect,
      // formControlName2: myValue2 (can be omitted)
    });
    //mostra no formulário se tem subitems relacionado com item
    this.listaItemSelect =item.item   
    //mostra a imagem relacioando ao item
    this.imagem = item.imagem
  
    this.itemForm.setValue(item)
    console.log(this.itemForm.value)
    // console.log(this.itemForm.value)
    // console.log(item)
  }
 async addItemList(item:Item){
    console.log(item)
    // this.listaItemSelect.pop()
    this.listaItemSelect.push(item)
  }

  resetForm(){
    // console.log("antes "+ JSON.stringify( this.itemForm.getRawValue))
    this.itemForm.reset()
    this.imagem = null
    this.listaItemSelect = []

    // console.log("depois "+ this.itemForm.)
  }
  imagemSelecionada(event){
    
    this.imagem = (event as Imagem)
  
  }
  ngOnDestroy(){
    this.unsubscribe$.next()
  }
  notify(msg:string){
    this.snackBar.open(msg,'Ok',{duration:2000})
  }
  // evento usado no selectionOption, quando seleciona um elemento é acionado este evento, que passo o valor ao listaItemSelect
  onNgModelChange(event){
    console.log('on ng model change', event);
    this.listaItemSelect =null
  }

  dialogo(){
    const dialogo = this.dialog.open(DialogComponent)
 
    return dialogo
   }


}
