# Requisitos do projeto

- O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados.

# R: Utilizado o argumento "paranoid: true" nos modelos + criação dos arquivos para cada modelo na pasta models explicitando a criação da coluna deletedAt.Feito o teste no postman com o id 2 da tabela pessoas.

- Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.

# R: Criou-se dois escopos no modelo Pessoa, para que o cliente possa consultar apenas os usuários ativos ou todos os registros. Para o método com todos os registros, o escopo é chamado "todosOsRegistros" e para o método com os usuários ativos, o defautScope foi definido como "where: { ativo: true }".

# 1. Foi necessário definir no Services um método genérico;

# 2. Em PessoaServices foi 'chumbado' o escopo previamente definido no modelo;

# 3. Em PessoaController resgatamos o método de PessoaServices.

# 4. Após isso foi criado uma rota extra GET /pessoas/todos para pegar todos os registros.

- Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.

# R: Foi criado um método de validação de email no modelo Pessoa (isEmail), para que o ato de inserir um registro com um email inválido não seja possível.

- É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.

# R: Foi definido dois escopos de associação no modelo Pessoa, para que o cliente consiga consultar todas as matriculas de um determinado estudante, ou apenas as ativas.

- O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).

# R: Foi definido um operador de busca de data inicial e final no controller Curso, para que o cliente consiga consultar cursos com data inicial e/ou final. O operador de busca de data inicial e final foi definido como um objeto com as propriedades "gte" e "lte" e foi utilizado funções ternárias para definir o valor do objeto where. Após isso, foi repassado como argumento para a função "findAll" no Services genérico, que foi responsável por buscar os cursos. Caso o filtro de data inicial não seja passado, o objeto where vazio foi passado diretamente para a função "findAll".

- O cliente quer poder consultar as matrículas por curso e saber quais delas estão lotadas, para organizar melhor as matrículas.

# R: Foi definido um objeto options com os parâmetros de busca, para que o cliente consiga consultar matriculas por estudante e por curso. O objeto options foi passado para a função "findAndCountAll" no Services genérico, que foi responsável por buscar as matriculas.

- O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.

# R: Foi utilizado o método de atualização de registro no Services genérico em conjunto com o método de cancelamento de matriculas do PessoaServices, para que o cliente consiga cancelar um estudante e todas as suas matrículas.
