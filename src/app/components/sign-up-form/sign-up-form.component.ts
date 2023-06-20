import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  emailValid = true;
  signUps: string[] = []
  submitted = false;
  mobileIllustrationSrc = '/assets/images/illustration-sign-up-mobile.svg';
  desktopIllustrationSrc = '/assets/images/illustration-sign-up-desktop.svg';
  currentIllustrationSrc?: string;


  ngOnInit(): void {
    this.updateImageSrc();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.updateImageSrc();
  }

  private updateImageSrc() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.currentIllustrationSrc = this.mobileIllustrationSrc;
    } else {
      this.currentIllustrationSrc = this.desktopIllustrationSrc;
    }
  }
  onSubmit(form: NgForm) {
    if (this.validateEmail(form.value.email)) {
      this.signUps.push(form.value.email);
      this.submitted = true;

      setTimeout(() => {
        this.dismissMessage();
      }, 5000);
    } else {
      this.emailValid = false;
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  dismissMessage() {
    this.submitted = false;
    this.emailValid = true;
  }
}
