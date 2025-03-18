const { Op } = require("sequelize");

const Controller = require("./Controller.js");
const CursoServices = require("../services/CursoServices.js");

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    // const where {
    //   data_inicio: {
    //     [Op.gte]: data,
    //     [Op.lte]: data,
    //   }
    // }

    // se existirem os param, criar uma propriedade {}
    data_inicial || data_final ? (where.data_inicio = {}) : null;
    // see existir data inicial, adiciona a prop gte com o valor
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    // se existir data final, adiciona a prop lte com o valor
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const cursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(cursos);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = CursoController;
