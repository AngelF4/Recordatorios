import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recordatorio-component',
  templateUrl: './recordatorio-component.component.html',
  styleUrls: ['./recordatorio-component.component.scss'],
})
export class RecordatorioComponentComponent  implements OnInit {
  showDateTime: boolean = false;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  toggleDateTime(event: CustomEvent) {
    this.showDateTime = event.detail.checked;
  }

}
