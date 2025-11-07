# Disney Foods API

**Disney Foods** é um projeto desenvolvido como parte de um trabalho da faculdade, 
com o objetivo de integrar conceitos de **desenvolvimento full-stack**, 
utilizando **Node.js (TypeORM + Express)** no backend e **Next.js (React + TypeScript)** no frontend.

O sistema tem como proposta reunir **receitas inspiradas em filmes da Disney**, permitindo ao usuário 
explorar comidas mágicas, descobrir em quais filmes elas aparecem e criar listas personalizadas com suas receitas favoritas.

> Este projeto ainda **não está finalizado** ---diversas partes
> estão em desenvolvimento e podem sofrer alterações nas próximas versões.

## Objetivo do Projeto

Este projeto foi desenvolvido como atividade prática para a disciplina de **Programação Web e Mobile** do curso de **Ciência de Computação** da **Universidade de Passo Fundo (UPF)**.
O intuito é demonstrar: 
- Modelagem e relacionamento entre entidades no banco de dados (1:N entre filmes e comidas);
- Criação de API REST com Node.js e TypeORM;
- Integração entre backend e frontend;
- Consumo da API via React/Next.js;
- Organização do código em camadas (controllers, services, entities, etc).

## Tecnologias Utilizadas 

### Backend

- Node.js
- Express
- TypeORM
- SQLite
- TypeScript

  ### Frontend

  - Next.js (React + TypeScript)
  - React Bootstrap
  - Axios

  ## Estrutura do Projeto

  ## Como Executar

  ### 1. Clonar o repositório

  ```bash
  git clone https://github.com/brendabragaaa/disney-foods-api.git
  cd disney-foods-api
  ```
  ### 2. Instalar dependências do backend

  ```bash
  cd backend
  npm install
  ```
  ### 3. Rodar o servidor backend

  ```bash
  npm run dev
  ```
  O servidor rodará em:\'http://localhost:3000'

  ### 4. Instalar dependências do frontend

  ```bash
  cd frontend
  npm install
  ```

  ### 5. Rodar o frontend

  ```bash
  npm run dev
  ```
  A aplicação estará disponível em: 'http://localhost:3001'

  ## Funcionalidades (até o momento)

  - Cadastro, listagem, atualização e exclusão de **Filmes**
  - Cadastro, listagem, atualização e exclusão de **Receitas**
  - Relacionamentos entre filmes e receitas
  - Página inicial com cards de acesso e barra de pesquisa
  - Busca integrada

  SOON:
  - Sistema de login de usuário
  - Criação de listas personalizadas de receitas
  - Cadastro, listagem, atualização e exclusão de filmes e receitas pelo usuário
 
  ## Desenvolvido por:

  **Brenda Braga de Lima**

  Trabalho acadêmico desenvolvido para a disciplina de **Programação Web e Mobile** --- Curso de Ciência da Computação
  da Universidade de Passo Fundo (UPF).

  ## Status do Projeto

  **Em desenvolvimento** --- novas funcionalidades e ajustes de integração estão sendo implmentados aos poucos.
  Algumas rotas e páginas ainda podem retornar dados incompletos ou estáticos.

  ## Créditos e Direitos Autorais

  Este projeto utiliza nomes, imagens e referências pertencentes à **The Walt Disney Company**.
  Todos os direitos sobre personagens, filmes, títulos e marcas são propriedades exclusivas da **Disney** e suas subsidiárias.

  O objetivo deste projeto é **puramente educacional**, desenvolvido como parte de um trabalho acadêmico
  para fins de **aprendizado de programação web**.
  Não há qualquer intuito comercial, redistribuição de conteúdo protegido ou monetização associada.

  **Referências**
  - [https://www.disney.com.br](https://www.disney.com.br)
  - Filmes e personagens mencionados pertencem à Disney e Pixar.
  
