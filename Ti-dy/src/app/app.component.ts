import { Component } from '@angular/core';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ti-dy';
  provider = new GoogleAuthProvider();
  private user?: User | null;
  userName?: string | null;
  isLoged = false;
  userImageSrc?: string | null;

  constructor() {
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  public attemptGoogleAuth(): void {
    const auth = getAuth();
    auth.languageCode = 'es_ES';
    signInWithPopup(auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.user = user;
        this.userName = this.getUserName()
        this.isLoged = true;
        this.userImageSrc = user.photoURL

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  public googleLogout() {
    console.log('Logout!');
    this.isLoged = false;
  }

  public getUserName(){
    if(this.user){
      return this.user.displayName?.split(' ')[0];
    }
    return
  }
}
