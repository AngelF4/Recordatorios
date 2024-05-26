import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recordatorio-component',
  templateUrl: './recordatorio-component.component.html',
  styleUrls: ['./recordatorio-component.component.scss'],
})
export class RecordatorioComponentComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}
