# Desafio Técnico Saraiva Educação

Esse projeto é a minha solução para o desafio do processo seletivo da Saraiva Educação. A proposta foi desenvolver um sistema web que permitisse consumir uma API para busca de receitas de coquetéis e drinks.


## Dependências

Utilizei o ReactJS para desenvolvimento do front-end, Jest para testes e CSS e Bulma para a estilização.


## Interface do Usuário

### Página inicial
* Página inicial: A aplicação inicia na Home, que ao carregar, apresenta uma lista de drinks aleatórios.
* Barra de navegação: possibilita que você escolha entre a Página inicial e a Página de favoritos.
* Barra de busca: possibilita que você busque por drinks em duas categorias - "pela primeira letra" ou "nome".
* Card de drinks: Apresenta a imagem e nome de cada drink.

### Detalhes da receita

Apresenta todas as informações do drink:
* Nome
* Alcóolico ou não
* Lista de ingredientes
* Instrução de preparo
* Adicionar ou remover o drink dos favoritos
* Compartilhar o link da receita

### Página de favoritos

* Card de todos os drinks favoritados com: Nome, imagem e coração (símbolo de favorito)

## Rodando a Aplicação

Clone o repositório e instale as dependências

### `npm install`

Rode a aplicação

### `npm start`

## Rodando os Testes

### `npm test`

