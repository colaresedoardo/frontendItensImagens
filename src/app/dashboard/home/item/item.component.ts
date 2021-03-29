import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item:Item
  @Input() habilitarLink:boolean =true

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(r =>{
      if (r.matches) {
        if (r.breakpoints[Breakpoints.XSmall]) {
          
        }
        if (r.breakpoints[Breakpoints.Small]) {
       
        }
        if (r.breakpoints[Breakpoints.Medium]) {
        
        }
        if (r.breakpoints[Breakpoints.Large]) {
      
        }
        if (r.breakpoints[Breakpoints.XLarge]) {
         
        }
      }
    })
   }

  ngOnInit(): void {
 
  }

}
