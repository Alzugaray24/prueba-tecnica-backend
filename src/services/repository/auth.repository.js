export default class AuthRepository {
  constructor(dao) {
    this.dao = dao;
  }

  save = (user) => {
    return this.dao.save(user);
  };

  login = (email) => {
    return this.dao.login(email);
  };
}
