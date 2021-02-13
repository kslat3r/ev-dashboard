import Smartcar from '@smartcar/auth';
import { observable, makeObservable, action, runInAction } from 'mobx';
import axios from 'axios';

class VehicleStore {
  client = null
  timeout = 10000

  @observable token = null
  @observable item = null
  @observable requesting = false
  @observable error = false

  constructor () {
    makeObservable(this);
  }

  @action initialise () {
    this.client = new Smartcar({
      clientId: process.env.REACT_APP_SMARTCAR_CLIENT_ID,
      redirectUri: process.env.REACT_APP_SMARTCAR_REDIRECT_URI,
      scope: [
        'required:read_battery',
        'required:read_charge',
        'required:read_location'
      ],
      onComplete: async (err, code) => {
        await this.exchange(code);
        await this.fetch();
      }
    });

    this.token = localStorage.getItem('token');
  }

  @action async authorise () {
    this.client.openDialog({
      forcePrompt: true,
      flags: ['country:GB']
    });
  }

  @action async exchange (code) {
    runInAction(() => {
      this.requesting = true;
      this.error = false;
    });

    let response;
    let token;

    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/exchange?code=${code}`);
      token = response.data.accessToken;
    } catch (e) {
      runInAction(() => {
        this.requesting = false;
        this.error = e;
      });

      return;
    }

    localStorage.setItem('token', token);

    runInAction(() => {
      this.token = token;
      this.requesting = false;
      this.error = false;
    });
  }

  @action async fetch (silent = false) {
    if (!this.token) {
      return;
    }

    runInAction(() => {
      if (silent === false) {
        this.requesting = true;
      }

      this.error = false;
    });

    let response;
    let item;

    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle?accessToken=${this.token}`);
      item = response.data
    } catch (e) {
      runInAction(() => {
        if (silent === false) {
          this.requesting = false;
        }

        this.error = e;
        this.token = null;
        this.item = null;
      });

      return;
    }

    runInAction(() => {
      this.item = item;

      if (silent === false) {
        this.requesting = false;
      }

      this.error = false;
    });

    setTimeout(() => {
      this.fetch(true);
    }, this.timeout);
  }
}

export default VehicleStore;
