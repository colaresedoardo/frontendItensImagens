import { BreakpointObserver , Breakpoints} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   cols : number;
  public items$:Observable<Item[]>
  public items:Item[]

  private unsubscribe$: Subject<any> = new Subject()


//tamanho de tela
  gridByBreakpoint = {
    xl: 5,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }
  constructor(private breakpointObserver: BreakpointObserver, private itemsService:ItemService) { 
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(r =>{
      if (r.matches) {
        if (r.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (r.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (r.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (r.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (r.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    })

  }

  ngOnInit(): void {

    console.log("entrei no ng init")
    // this.items$ = this.itemsService.get()
    // .pipe(
    //   takeUntil(this.unsubscribe$),
    //   map((item)=>{
        
    //       return item ? item.filter(item=>!(item.item.length!=0)): []
    //   }))
    this.itemsService.get()
    .pipe(
      takeUntil(this.unsubscribe$),
      map((item)=>{
        
          return item ? item.filter(item=>!(item.item.length!=0)): []
      })).subscribe(
        (items)=>{
          console.log("entrei no subscribe")
          this.items =items
        }
      )

  
    
 
  }
 

  ngOnDestroy(){
    this.unsubscribe$.next()
  }



}


