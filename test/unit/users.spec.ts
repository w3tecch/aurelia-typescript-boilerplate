import {expect} from './setup';
import {HttpClient} from 'aurelia-fetch-client';
import {Users} from '../../src/app/modules/users/users';

class HttpStub extends HttpClient {
  public url;
  public itemStub;

  public fetch(url): any {
    let response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }

  public configure(config) {
    return this;
  }
}

describe('the Users module', () => {
  it('sets fetch response to users', (done) => {
    let itemStubs = [1];
    let itemFake = [2];

    let getHttp = () => {
      let http = new HttpStub();
      http.itemStub = itemStubs;
      return http;
    };

    let sut = new Users(getHttp);

    sut.activate().then(() => {
      expect(sut.users).to.equal(itemStubs);
      expect(sut.users).to.not.equal(itemFake);
      done();
    });
  });
});
