const { expect } = require("chai");
const sinon = require("sinon");

const modelProducts = require("../../models/modelProducts");
const servicesProducts = require("../../services/servicesProducts");

describe("Obtém todos os dados de Products", () => {
  before(() => {
    const mockProduct = [{ id: 1, name: "Product1" }];
    sinon.stub(modelProducts, "getAll").resolves(mockProduct);
  });

  after(() => {
    modelProducts.getAll.restore();
  });

  it("Verificar se é um array de retorno", async () => {
    const result = await servicesProducts.getAll();
    expect(result).to.be.a('array');
  });
});

describe('Retorna um produto baseado no id', () => {
  const mockProduct = [{ id: 1, name: "Produto1" }]
  const mockId = 1;

});
  before(() => {
    sinon.stub(modelProducts, 'getById').resolves(mockProduct);
  });

  after(() => {
    modelProducts.getById.restore();
  });

  it("Retorna um objeto com o id fornecido.", async () => {
    const [result] = await servicesProducts.getById(mockId);
    expect(result).to.be.a('object');
  })

describe('Quando insere um novo produto no Banco de Dados', () => {
  describe('Quando é inserido com sucesso', () => {
    const productInsert = {
      name: 'Produto1'
    }

    before(() => {
      const TESTID = 1;
      sinon.stub(modelProducts, 'add').resolves({ id: TESTID });
    });

    after(() => {
      modelProducts.add.restore();
    })

    it('Ao ser inserido com sucesso retorna um objeto', async () => {
      const result = await servicesProducts.add(productInsert);
      expect(result).to.be.a('object');
    })

    it('Ao gerar um novo produto deve possuir a propriedade "id"', async () => {
      const result = await servicesProducts.add(productInsert);
      expect(result).to.have.a.property('id');
    });
  });
});
