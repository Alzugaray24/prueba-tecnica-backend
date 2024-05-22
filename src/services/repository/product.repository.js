export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = ({ page, limit }) => {
    return this.dao.getAll({ page, limit });
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
