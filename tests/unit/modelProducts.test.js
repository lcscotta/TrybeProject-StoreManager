const { expect } = require("chai");
const sinon = require("sinon");

const modelProducts = require("../../models/modelProducts");
const connection = require("../../helpers/connection");
const { proxyAuthRequired } = require("@hapi/boom");
const { array } = require("joi");

describe("Obtém todos os produtos", () => {
  const mockProduct = [
    {
      id: 1,
      name: "Produto1",
    },
    {
      id: 2,
      name: "Produto2",
    },
  ];

  before(async () => {
    await sinon.stub(connection, "execute").resolves([mockProduct]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it("Retorna um array", async () => {
    const result = await modelProducts.getAll();
    expect(result).to.be.a("array");
  });
});

describe("Obtem o produto por ID", () => {
  const mockProduct = [{ id: 1, name: "Produto1" }];
  const mockId = 1;

  before(async () => {
    await sinon.stub(connection, 'execute').resolves([mockProduct])
  });
  
  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto com o id declarado', async () => {
    const result = await modelProducts.getById(mockId);
    expect(result).to.be.a('object');
  })
});

describe("Insere um novo produto no Banco de Dados", () => {
  const insertProduct = {
    name: "Produto1",
  };

  before(async () => {
    const execute = [{ insterId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

describe("Quando o produto foi inserido com sucesso", () => {
    it("Deve retornar um objeto", async () => {
      const response = await modelProducts.add(insertProduct);
      expect(response).to.be.a("object");
    });

    it("Deve incrementar uma propriedade id automaticamente", async () => {
      const response = await modelProducts.add(insertProduct);
      expect(response).to.have.a.property("id");
    });
  });
});