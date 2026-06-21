# Outfit Store Cypress 2026

Projeto de automação de testes end-to-end desenvolvido com Cypress para validar fluxos da aplicação Outfit Store.

A automação cobre cenários principais de autenticação, como login e logout, executando os testes contra a aplicação publicada em:

```text
https://outfit-store-alpha.vercel.app

Além da execução local, o projeto também possui uma pipeline no GitHub Actions para executar os testes manualmente e armazenar o relatório da execução como artifact.
Tecnologias Utilizadas
Cypress
O Cypress foi escolhido por ser uma ferramenta moderna para testes end-to-end, com boa experiência de desenvolvimento, execução rápida e recursos visuais que ajudam na análise dos testes.
Com ele é possível:
simular ações reais do usuário;
validar elementos na tela;
executar testes localmente;
executar testes em ambiente de CI;
gerar evidências e relatórios de execução.
JavaScript
Os testes foram escritos em JavaScript por ser uma linguagem simples, bastante usada no ecossistema web e integrada naturalmente ao Cypress.
GitHub Actions
O GitHub Actions foi utilizado para criar uma pipeline de execução dos testes. Neste projeto, a pipeline foi configurada para ser executada manualmente, usando o botão Run workflow dentro da aba Actions do GitHub.
Essa escolha foi feita para estudar o processo de CI sem executar a pipeline automaticamente a cada push ou pull request.
Mochawesome
O Mochawesome foi utilizado para gerar um relatório HTML da execução dos testes. Esse relatório é armazenado na pipeline como artifact e pode ser baixado após a execução.
Como Rodar o Projeto Localmente
Antes de começar, é necessário ter o Node.js instalado na máquina.
Depois, clone o repositório:
git clone https://github.com/LuisCrispim/outfit-store-cypress-2026.git
Acesse a pasta do projeto:
cd outfit-store-cypress-2026
Instale as dependências:
npm install
Configuração das Variáveis de Ambiente
Os testes utilizam dados de ambiente para realizar login na aplicação.
Localmente, crie um arquivo chamado:
cypress.env.json
Na raiz do projeto, adicione:
{
  "email": "emailteste@email.com",
  "senha": "12345678",
  "usuario": "usuario.qa"
}
Esses dados são utilizados pelo Cypress através de:
Cypress.env('email')
Cypress.env('senha')
Cypress.env('usuario')
Como Rodar os Testes
O projeto possui scripts configurados no package.json.
Para abrir o Cypress em modo interativo:
npm run cy:open
Para executar os testes em modo headless:
npm run cy:run
O script cy:run é o mesmo utilizado na pipeline do GitHub Actions.
Pipeline no GitHub Actions
A pipeline foi configurada para execução manual, ou seja, ela não roda automaticamente quando um código é enviado para o repositório.
Para executar:
Acesse o repositório no GitHub.
Clique na aba Actions.
Selecione o workflow de execução dos testes.
Clique em Run workflow.
Aguarde a execução finalizar.
Ao final da execução, o relatório de testes é armazenado como artifact na própria pipeline.
Relatório de Execução
O relatório HTML é gerado durante a execução dos testes e salvo como artifact no GitHub Actions.
Após a pipeline finalizar:
Acesse a execução da pipeline.
Baixe o artifact chamado Relatório de Testes E2E.
Extraia o arquivo .zip.
Abra o arquivo HTML do relatório no navegador.
Importante: o HTML deve ser aberto após extrair o .zip, pois abrir diretamente de dentro do arquivo compactado pode fazer o relatório aparecer em branco.
Uso de GitHub Secrets
Durante o desenvolvimento deste projeto, decidi estudar o uso de Secrets no GitHub Actions.
Neste caso, os dados utilizados não são sensíveis. Eles representam apenas informações de teste usadas para o estudo da ferramenta e para permitir que a pipeline execute os testes da mesma forma que a execução local.
Mesmo assim, optei por usar GitHub Secrets para entender melhor como variáveis protegidas são configuradas e consumidas dentro de uma pipeline.
Secrets Configurados
No GitHub, os secrets foram configurados em:
Settings > Secrets and variables > Actions > New repository secret
Foram criados os seguintes secrets:
CYPRESS_EMAIL
Valor:
emailteste@email.com
CYPRESS_SENHA
Valor:
12345678
CYPRESS_USUARIO
Valor:
usuario.qa
No workflow, esses secrets são enviados para o Cypress como variáveis de ambiente:
env:
  CYPRESS_email: ${{ secrets.CYPRESS_EMAIL }}
  CYPRESS_senha: ${{ secrets.CYPRESS_SENHA }}
  CYPRESS_usuario: ${{ secrets.CYPRESS_USUARIO }}
O prefixo CYPRESS_ permite que o Cypress leia esses valores usando Cypress.env().
Exemplo:
Cypress.env('email')
recebe o valor definido em:
CYPRESS_email
Exemplo de Workflow
Exemplo de configuração da pipeline manual:
name: 'Execução Manual'

on:
  workflow_dispatch:

jobs:
  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Instalando dependências
        run: npm ci

      - name: Executando os testes e2e
        run: npm run cy:run
        env:
          CYPRESS_email: ${{ secrets.CYPRESS_EMAIL }}
          CYPRESS_senha: ${{ secrets.CYPRESS_SENHA }}
          CYPRESS_usuario: ${{ secrets.CYPRESS_USUARIO }}

      - name: Salvando relatórios de testes
        uses: actions/upload-artifact@v4
        if: ${{ always() }}
        with:
          name: Relatório de Testes E2E
          path: cypress/reports/mochawesome
          if-no-files-found: warn
Observações
A pipeline é executada manualmente.
O relatório de execução é armazenado na própria pipeline.
Os dados usados nos secrets são dados de teste.
O projeto aplica conceitos de automação end-to-end, CI e geração de relatórios.
O README documenta a instalação, execução local, execução em pipeline e configuração dos secrets.
