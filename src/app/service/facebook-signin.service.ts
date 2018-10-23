import { Injectable } from '@angular/core';

declare const FB: any;

@Injectable()
export class FacebookSigninService {


  /**
   * The `signin-success` event is fired if a user
   * signs in successfully.
   *
   * @event signin-success
   */

  /**
   * The `signin-not-authorized` event is fired if a
   * user is signed into Facebook but not into your app.
   *
   * @event signin-not-authorized
   */

  /**
   * The `signin-not-logged-in` event is fired if a
   * user is not signed into facebook.
   *
   * @event signin-not-logged-in
   */

  _script_loaded: Boolean = false;

  constructor() {}

  signOut() {
    /* NOTE:
    1. A person logs into Facebook, then logs into your app. Upon logging out from your app,
       the person is still logged into Facebook.
    2. A person logs into your app and into Facebook as part of your app's login flow.
       Upon logging out from your app, the user is also logged out of Facebook.
    3. A person logs into another app and into Facebook as part of the other app's login flow,
       then logs into your app. Upon logging out from either app, the user is logged out of Facebook.
    */
    FB.logout(function (response) {
      console.log('Print Logout Response:: ', response);
    }.bind(this));
  }

  _scriptLoaded(success) {
      if (success) {
        this._script_loaded = true;
      }
      console.log('>>>>>>>>> >>>>>> FACEBOOK SDK LOAD SUCCESSFUL? ', success);
  }

  _loadScript(src) {
      const js = document.createElement('script');
      js.src = src;
      js.setAttribute('async', '');
      js.onload = function () {
        console.log('Loaded Succesfully!');
        this._scriptLoaded(true);
      }.bind(this);
      js.onerror = function () {
        console.log('SDK not loaded');
        this._scriptLoaded(false);
      }.bind(this);
      document.head.appendChild(js);
      console.log(js);
  }
}
