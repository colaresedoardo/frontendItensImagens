import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Imagem } from '../../models/imagem';
import { ImagemService } from '../../services/imagem.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';



@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css']
})
export class ImagemComponent implements OnInit {
  
 
  
  private unsubscribe$: Subject<any> = new Subject()
  public imagems$:Observable<Imagem[]>
  imagens:Imagem[]=[ ]
  formImg:FormGroup=  this.fb.group({
    profile: [''],
    _id:[null],
  });
 @ViewChild('file') form:ElementRef
 @Output() imagemSelecionada = new EventEmitter<MatSelectionListChange>()
  // depEdit:Department = null
  constructor(private imagemService:ImagemService,private fb: FormBuilder,  private snackBar:MatSnackBar, private dialog: MatDialog,private itemService:ItemService) {

   }

  ngOnInit(): void {
  
   this.imagemService.get().pipe().subscribe((img)=>{
      this.imagens =img
    } )

    

  }


  submit(){
    const formData = new FormData();
    // let data = this.formImg.value
    formData.append('file',this.formImg.get('profile').value)
    formData.append('_id',this.formImg.get('_id').value)
    console.log("form data" + formData.get('_id'))
   if(this.formImg.value._id!=null){
      console.log(this.formImg.value)
       
      this.imagemService.update(formData).subscribe()
   }else{
     this.imagemService.add(formData).subscribe()
    console.log(this.formImg.value)
   }
    // this.imagemService.add(formData).subscribe()
    // console.log(  this.imagens)
    this.resetarForm()
  }

  onFileSelect(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formImg.get('profile').setValue(file);
    }
  }
 async delete(imagem:Imagem){
    // console.log(imagem)

    const dialogo = this.dialogo()
    dialogo.afterClosed().subscribe((confirmar:boolean)=>{
      if(confirmar){
        let items:Item[]
         this.itemService.get().subscribe(
          (item)=>{
           
            if(item!=null){
              items = item
            }
          
          }
        )
        console.log("items " + JSON.stringify( items))
        // console.log("items imagem " + JSON.stringify( items.map(i=>i.imagem?._id)))
        //  console.log("imagem id " + imagem._id)
        let isImagemRelacioandoItem =  items.findIndex(i =>i.imagem?._id === imagem?._id)
        // console.log("aquiiiiiiiiiii " +isImagemRelacioandoItem)
        if((isImagemRelacioandoItem < 0)){
          this.imagemService.del(imagem).subscribe(()=>{
            this.notify("Deletado com sucesso")
          },(err)=>{
            this.notify("Erro ao deletar "+ err)
          })
        }else{
          this.notify("Imagem relacionada ao item. Favor remover o item ")
        }
      
        console.log(items)
        
      }
    })
   
  }
  edit(imagem:Imagem){
    console.log(imagem)
    this.formImg.patchValue({
      _id: imagem._id
    })
    // this.imagemService.del(imagem).subscribe()
  }

  //função que emite a imagem de um componente para outro que usar
  SelecionandoImagem(imagem){
  
      this.imagemSelecionada.emit(imagem);
  }
  ngOnDestroy(){
    this.unsubscribe$.next()
    // this.imagems$ = null
  }
  resetarForm(){
    this.form.nativeElement.value =""
  }
  notify(msg:string){
    this.snackBar.open(msg,'Ok',{duration:2000})
  }

  dialogo(){
   const dialogo = this.dialog.open(DialogComponent, {
    data:{

      message: 'Tem certeza que deseja Excluir',
      buttonText: {
        ok: 'Sim',
        cancel: 'Não'
      }
    }
   })

   return dialogo
  }

}
