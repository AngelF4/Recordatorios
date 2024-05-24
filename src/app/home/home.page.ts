import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('popover') popover: any;

  repeatArray = Array(15).fill(0)
  constructor(private router: Router, private popoverCtrl: PopoverController) {}

  segmentValue:String = 'lista';
  isOpen = false;

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  irAConfig(){
    this.isOpen = false;
    this.popoverCtrl.dismiss();
    this.router.navigate(['/config']);
  }

  irALogin(){
    this.popoverCtrl.dismiss();
    this.router.navigate(['/login']);
  }

  
}
