import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Timestamp } from 'firebase/firestore';
import { ModalController } from '@ionic/angular';
import { Recordatorio, HighlightedDate } from '../interfaces/recordatorio';
import { RecordatorioComponentComponent } from '../pages/recordatorio-component/recordatorio-component.component';
import { consumerMarkDirty } from '@angular/core/primitives/signals';


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
  recordatorios: Recordatorio[]=[];
  highlightedDates: HighlightedDate[] = [];
  repeatArray = Array(15).fill(0)
  
  constructor(
    private router: Router, 
    private popoverCtrl: PopoverController,
    private user: UserService,
    private modalCtrl: ModalController
  ) {}

  canDismiss = false;
  presentingElement: any;
  segmentValue: String = 'lista';
  isOpen = false;

  ngOnInit() {
    this.presentingElement = document.querySelector('ion-content');
    this.user.getRecordatorios().subscribe(recordatorios => {
      console.log(recordatorios);
      this.recordatorios = recordatorios;
      this.highlightedDates = recordatorios.map(recordatorio => {
        return {
          date: recordatorio.date.toDate().toISOString(),
          textColor: 'red',
          backgroundColor: 'red'
        };
      });
      console.log(this.highlightedDates)
    });
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
  
  irAConfig() {
    this.isOpen = false;
    this.popoverCtrl.dismiss();
    this.router.navigate(['/config']);
  }

  irALogin() {
    this.popoverCtrl.dismiss();
    this.router.navigate(['/login']);
  }

  submitAndDismiss() {
    this.onSubmit();
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
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

  async onClcikDelete(recordatorio: Recordatorio){
    const response = await this.user.deleteRecordatorio(recordatorio);
    console.log('Respuesta de eliminación:', response);
  }

  async abrirModalReco() {
    const modal = await this.modalCtrl.create({
      component: RecordatorioComponentComponent
    });
    return await modal.present();
  }

}

