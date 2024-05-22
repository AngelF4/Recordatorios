import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor() { }

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
}
