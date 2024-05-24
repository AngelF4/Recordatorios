import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('popover') popover: any;
  title: string = '';
  notes: string = '';
  date: string = new Date().toISOString();

  repeatArray = Array(15).fill(0)
  constructor(private router: Router, 
              private popoverCtrl: PopoverController,
              private user: UserService) {}

  canDismiss = false;
  presentingElement: any;

  segmentValue:String = 'lista';
  isOpen = false;

  ngOnInit() {
    this.presentingElement = document.querySelector('ion-content');
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }

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

  async onSubmit() {
    const dateTimestamp = Timestamp.fromDate(new Date(this.date));
    const formData = {
      title: this.title,
      notes: this.notes,
      date: dateTimestamp 
    };

    console.log(formData);
    const response = await this.user.addRecordatorio(formData);
    console.log(response);
  }

}

