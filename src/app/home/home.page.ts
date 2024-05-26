import { Timestamp } from 'firebase/firestore';
import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';
import { Recordatorio } from '../interfaces/recordatorio';

export interface HighlightedDate {
  date: string;
  textColor: string;
  backgroundColor: string;
} 

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
  selectedDate: string = new Date().toISOString();
  canDismiss = false;
  presentingElement: any;
  segmentValue: String = 'lista';
  isOpen = false;
  isModalOpen = false;

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private user: UserService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('ion-content');
    this.user.getRecordatorios().subscribe((recordatorios) => {
      console.log(recordatorios);
      this.recordatorios = recordatorios;
      this.highlightedDates = recordatorios.map((recordatorio) => {
        const localDate = this.formatDateToLocal(recordatorio.date.toDate());
        return {
          date: localDate,
          textColor: 'black',
          backgroundColor: 'grey',
        };
      });
      console.log(this.highlightedDates);
    });
  }

  formatDateToLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDateString(date: string | Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    };
    return new Date(date).toLocaleDateString('es-ES', options);
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

  submitAndDismissCreate() {
    this.onCreateRecordatorio();
    this.dismissModal();
    this.setOpen(false);
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
    console.log("Fecha enviada en el formulario:", this.date);  // Log para verificar la fecha antes de enviar
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

  async onCreateRecordatorio() {
    const dateTimestamp = Timestamp.fromDate(new Date(this.date));
    const formData = {
      title: this.title,
      notes: this.notes,
      date: dateTimestamp,
    };

    console.log(formData);
    const response = await this.user.addRecordatorio(formData);
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
    console.log("Fecha asignada al modal:", this.date); 
    this.showDateTime = true;
    this.setOpen(true);
  }

  onDateChange(event: CustomEvent) {
    console.log("Fecha seleccionada:", event.detail.value);
    this.date = event.detail.value;
  }

  isSameDate(date1: string, date2: string): boolean {
    const formattedDate1 = this.formatDateString(date1);
    const formattedDate2 = this.formatDateString(date2);
    console.log(`Comparando ${formattedDate1} con ${formattedDate2}`);
    return formattedDate1 === formattedDate2;
  }
}
