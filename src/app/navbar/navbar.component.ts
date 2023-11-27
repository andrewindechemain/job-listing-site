import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   currentDate = Date.now(); //Logic to add method for displaying present date

  navbarOpen = false;  //typescript logic for default Navbar is in a closed state

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;  //Logic for navbar open action when toggled/button is clicked
  }
}
