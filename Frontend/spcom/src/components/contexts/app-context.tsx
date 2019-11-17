import { observable } from 'mobx';

export default class AppContext {
  @observable
  public isLoggedIn: boolean = false;

  @observable
  public email: string = '';

  @observable
  public password: string = '';

  @observable
  public userName: string = '';

  @observable
  public isParent: boolean = false;

  @observable
  public isHealthy = false;
}
