const { expect } = require("chai");
const sinon = require("sinon");

const servicesProducts = require("../../services/servicesProducts");
const controllerProducts = require("../../controllers/controllerProducts");
const { execute } = require("../../helpers/connection");

describe("Ao chamar o controller getAll", () => {
  describe("Quando há elementos", () => {
    const res = {};
    const req = {};
    const mockProduct = [{ id: 1, name: "Product1" }];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(mockProduct);
      sinon.stub(servicesProducts, "getAll").resolves(mockProduct);
    });

    after(() => {
      servicesProducts.getAll.restore();
    });

    it("Verifica o retorno dos dados", async () => {
      await controllerProducts.getAll(req, res);
      expect(res.json.calledWith(mockProduct)).to.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe("Controller add é acionado", () => {
  describe("Produto inserido com sucesso", async () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {
        name: "Produto1",
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(servicesProducts, "add").resolves(true);
    });

    after(() => {
      servicesProducts.add.restore();
    });

    it("informar status com código 201 quando adicionado com sucesso", async () => {
      await controllerProducts.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
    it('Quando adicionado com sucesso, deve informar o resultado como "object"', async () => {
      await controllerProducts.add(req, res);
      expect(res).to.be.a("object");
    });
  });

describe("Quando o produto inserido não é válido", async () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(servicesProducts, "add").resolves(false);
    });

    after(() => {
      servicesProducts.add.restore();
    });

    it("Quando produto inserido é inválido o código 400", async () => {
      await controllerProducts.add(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
  });
});