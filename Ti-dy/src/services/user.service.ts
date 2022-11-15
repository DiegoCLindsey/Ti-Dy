import { Injectable } from "@angular/core";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private provider = new GoogleAuthProvider();
  public userName?: string | null;
  public isLoged = false;
  public userImageSrc?: string | null;

  public user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor(){
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.unsetUser();
      }
    });
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
        this.setUser(user);

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
    getAuth().signOut();
    this.unsetUser();
  }

  private setUser(user:User){
    this.user.next(user);
    this.userName = this.setUserName();
    this.isLoged = true;
    this.userImageSrc = user.photoURL;
  }

  private unsetUser(){
    this.user.next(null);
    this.userName = null;
    this.isLoged = false;
    this.userImageSrc = null;
  }

  private setUserName() {
    let value = null;
    this.user.subscribe((user) => {
      if (user) {
        value = user.displayName?.split(' ')[0];
      }
    })
    return value;
  }

}
