export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  findByEmail = (email) => {
    return this.dao.findByEmail(email);
  };

  findUserById = (id) => {
    return this.dao.findUserById(id);
  };
}
