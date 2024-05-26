import { Timestamp } from 'firebase/firestore';
import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';
import { Recordatorio, HighlightedDate } from '../interfaces/recordatorio';

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
  showDateTime: boolean = false;
  recordatorios: Recordatorio[] = [];
  highlightedDates: HighlightedDate[] = [];
  selectedRecordatorio: Recordatorio | null = null; 
  repeatArray = Array(15).fill(0);

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
  isModalOpen = false;

  ngOnInit() {
    this.presentingElement = document.querySelector('ion-content');
    this.user.getRecordatorios().subscribe((recordatorios) => {
      console.log(recordatorios);
      this.recordatorios = recordatorios;
      this.highlightedDates = recordatorios.map((recordatorio) => {
        const dateWithoutTime = recordatorio.date.toDate().toISOString().split('T')[0];
        return {
          date: dateWithoutTime,
          textColor: 'red',
          backgroundColor: 'yellow',
        };
      });
      console.log(this.highlightedDates);
    });
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
    this.setOpen(false);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async onSubmit() {
    const dateTimestamp = this.showDateTime ? Timestamp.fromDate(new Date(this.date)) : this.selectedRecordatorio?.date;
    if (!dateTimestamp) {
      console.error('Fecha no válida');
      return;
    }

    const formData: Recordatorio = {
      id: this.selectedRecordatorio?.id,
      title: this.title,
      notes: this.notes,
      date: dateTimestamp,
    };

    console.log(formData);
    const response = this.selectedRecordatorio
      ? await this.user.editRecordatorio(formData)
      : await this.user.addRecordatorio(formData);
    console.log(response);
  }

  async onClickDelete(recordatorio: Recordatorio) {
    const response = await this.user.deleteRecordatorio(recordatorio);
    console.log('Respuesta de eliminación:', response);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  toggleDateTime(event: CustomEvent) {
    this.showDateTime = event.detail.checked;
  }

  openEditModal(recordatorio: Recordatorio) {
    this.selectedRecordatorio = recordatorio;
    this.title = recordatorio.title;
    this.notes = recordatorio.notes;
    this.date = recordatorio.date.toDate().toISOString();
    this.showDateTime = false; 
    this.setOpen(true);
  }

  onDateChange(event: CustomEvent) {
    this.date = event.detail.value;
  }
}