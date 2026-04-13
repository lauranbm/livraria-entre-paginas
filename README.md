Autor: Laura Neves Bittencourt Moreira  
Disciplina: Desenvolvimento de Software WEB  
Professor: Alexandre Cláudio de Almeida  

# Livraria Entre Páginas

## Descrição
Aplicação web desenvolvida com React, TypeScript e Bootstrap para o controle interno de uma livraria. O sistema permite visualizar indicadores em dashboard, registrar vendas, cadastrar livros, consultar estoque e acessar páginas separadas para vendas e estoque.

## Tema escolhido
Sistema interno de livraria.

## Tecnologias utilizadas
- React
- Vite
- TypeScript
- Bootstrap via CDN
- CSS externo

## Arquitetura escolhida
A arquitetura da aplicação foi pensada para deixar o projeto organizado, reutilizável e fácil de manter. Para isso, a interface foi dividida em componentes e páginas com funções bem definidas, em vez de concentrar tudo em um único arquivo.

A separação de responsabilidades foi feita ao criar arquivos diferentes para partes diferentes do sistema. O componente `Header` ficou responsável pelo cabeçalho, o `CardResumo` pelos cards do dashboard, e o `LivroCard` pela exibição das informações de cada livro e pela ação de registrar venda. Além disso, as páginas `VendasPage` e `EstoquePage` foram criadas separadamente para organizar melhor a navegação e evitar sobrecarregar a página principal com muitas informações.

A reutilização de código foi aplicada principalmente nos componentes. Em vez de repetir a mesma estrutura várias vezes, o projeto reutiliza o `Header` em mais de uma página, o `CardResumo` nos indicadores do dashboard e o `LivroCard` na listagem dos livros. Isso reduz repetição e deixa o código mais limpo.

A facilidade de manutenção foi garantida porque cada parte do sistema ficou isolada em seu próprio arquivo. Dessa forma, caso seja necessário alterar o cabeçalho, o visual dos cards, a estrutura dos livros ou a tipagem dos dados, a mudança pode ser feita em um único lugar, sem precisar modificar o projeto inteiro. A interface `ILivro`, colocada em arquivo separado, também ajuda nisso, pois padroniza os dados usados nas diferentes partes da aplicação.

## Organização do projeto
O projeto foi organizado em pastas para deixar a estrutura mais clara:
- `components`: componentes reutilizáveis da interface
- `pages`: páginas específicas do sistema
- `types`: definição da interface `ILivro`

Essa organização facilita a leitura do projeto e evita concentrar toda a lógica em um único arquivo.

## Lógica de estado
Foi utilizado `useState` para controlar:
- a lista de livros
- o cadastro de novos livros
- a busca por título
- a atualização do estoque
- a quantidade de vendas
- o faturamento total

Além disso, foi utilizada persistência com `localStorage` para manter os dados atualizados entre a página principal, a página de vendas e a página de estoque.

Quando uma venda é registrada, o estado é atualizado imediatamente e os contadores do dashboard mudam em tempo real.

## Tipagem com TypeScript
Foi utilizada a interface `ILivro` para representar os dados dos livros da aplicação. Essa escolha ajuda a evitar erros, melhora a organização do código e garante mais segurança na manipulação do estado e das props.

## Responsividade
A responsividade foi feita com o sistema de grades do Bootstrap, seguindo a lógica das 12 colunas. No desktop, o sistema mantém uma organização com menu lateral e conteúdo principal separados, além dos cards do dashboard distribuídos lado a lado. Já em telas menores, como no celular, esses blocos se reorganizam automaticamente e passam a ficar empilhados, o que melhora a visualização e evita que os elementos fiquem apertados.

## Semântica HTML5
Foram utilizadas tags semânticas como:
- `header`
- `main`
- `section`
- `aside`
- `address`

## Funcionalidades implementadas
- Dashboard com contadores dinâmicos
- Registro de venda
- Atualização automática do estoque
- Cálculo de faturamento total
- Busca de livros por título
- Cadastro de novos livros
- Exibição de capas dos livros
- Página de vendas
- Página de estoque com busca

## Como executar o projeto
```bash
npm install
npm run dev

link para o video de apresentação: https://youtu.be/7HeQ1H8zTpU