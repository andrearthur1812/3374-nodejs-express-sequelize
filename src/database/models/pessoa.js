"use strict";
const isValido = require("../../utils/validaCpfHelper.js");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pessoa.hasMany(models.Curso, { foreignKey: "docente_id" });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
        scope: { status: "matriculado" },
        as: "aulasMatriculadas",
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
        as: "todasAsMatriculas",
      });
    }
  }
  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 40],
            msg: "O nome deve ter entre 3 e 40 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "O email informado não é válido",
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          cpfEhValido: (cpf) => {
            if (!isValido(cpf)) throw new Error("CPF inválido");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoa",
      tableName: "pessoas",
      paranoid: true,
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        todosOsRegistros: {
          where: {},
        },
      },
    }
  );
  return Pessoa;
};
