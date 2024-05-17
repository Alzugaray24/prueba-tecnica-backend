export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  save = (product) => {
    return this.dao.save(product);
  };

  update = (id, product) => {
    return this.dao.update(id, product);
  };

  delete = (id) => {
    return this.dao.delete(id);
  };
}
