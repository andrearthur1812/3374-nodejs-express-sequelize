const Controller = require("./Controller.js");
const PessoaServices = require("../services/PessoaServices.js");

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async pegaMatriculasAtivas(req, res) {
    const { estudante_id } = req.params;

    try {
      const listaMatriculas =
        await pessoaServices.pegaMatriculasAtivasPorEstudante(
          Number(estudante_id)
        );
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaTodasMatriculas(req, res) {
    const { estudante_id } = req.params;

    try {
      const todasMatriculas =
        await pessoaServices.pegaTodasAsMatriculasPorEstudante(
          Number(estudante_id)
        );
      return res.status(200).json(todasMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaTodasAsPessoas(req, res) {
    try {
      const listaPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaPessoas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async cancelaRegistroEstudante(req, res) {
    const { estudante_id } = req.params;

    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({
        message: `Matrículas canceladas do estudante ${estudante_id}`,
      });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = PessoaController;
