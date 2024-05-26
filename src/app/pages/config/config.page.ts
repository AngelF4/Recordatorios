import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  imageUrl: string | null = null;
  presentingElement: any;
  constructor(private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController
  ) { }

  paletteToggle = false;

  ngOnInit() {
    // Initialize the dark palette based on the stored value
    this.initializeDarkPalette();
  }

  // Initialize the dark palette based on stored preference
  initializeDarkPalette() {
    const storedPreference = localStorage.getItem('dark-mode-enabled');
    console.log('Stored Preference:', storedPreference);

    // Determine the initial state of the dark palette based on stored preference
    const isDark = storedPreference !== null ? JSON.parse(storedPreference) : false;
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev: any) {
    const isChecked = ev.detail.checked;
    console.log('Toggle Changed:', isChecked);
    this.toggleDarkPalette(isChecked);
    // Store the user's preference in localStorage
    localStorage.setItem('dark-mode-enabled', JSON.stringify(isChecked));
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    console.log('Toggling Dark Palette:', shouldAdd);
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }








    dismissModal() {
      this.modalCtrl.dismiss();
    }




    async replaceImage() {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.pickImage(CameraSource.Photos);
            },
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.pickImage(CameraSource.Camera);
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
      await actionSheet.present();
    }
  
    async pickImage(source: CameraSource) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source,
      });
  
      this.imageUrl = image.webPath || null;
    }
}
