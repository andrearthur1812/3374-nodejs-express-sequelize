const Sequelize = require("sequelize");

const Controller = require("./Controller.js");
const MatriculaServices = require("../services/MatriculaServices.js");

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculasPorEstudante =
        await matriculaServices.pegaEContaRegistros({
          where: {
            estudante_id: Number(estudante_id),
            status: "matriculado",
          },
          order: [["id", "DESC"]],
          limit: 2,
        });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaCursosLotados(req, res) {
    const limiteMatriculaPorCurso = 2;

    try {
      const todosOsCursos = await matriculaServices.pegaEContaRegistros({
        where: { status: "matriculado" },
        attributes: ["curso_id"],
        group: ["curso_id"],
        having: Sequelize.literal(
          `count(curso_id) >= ${limiteMatriculaPorCurso}`
        ),
      });

      return res.status(200).json(todosOsCursos.count);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = MatriculaController;
