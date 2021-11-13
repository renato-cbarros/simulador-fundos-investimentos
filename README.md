<h1 align="left">Simulador de fundos de investimentos</h1>

<p align="left">Teste de desenvolvimento, criado com Angular 12, consiste em uma mini aplicação que simula um resgate personalizado de fundos de investimentos em ações.</p>

![Simulador-de-Fundos-de-Investimento](https://user-images.githubusercontent.com/42192877/141603745-12400a8b-0948-4c7f-91ec-e7b9e88e7262.gif)

### Cobertura teste unitarios até o momento

![Captura de tela 2021-11-13 002446](https://user-images.githubusercontent.com/42192877/141604014-23a9e25a-63f0-47cb-a485-82d4739d369b.png)

### Documentação da API
1. https://run.mocky.io/v3/7b2dfe42-37a3-4094-b7ce-8ee4f8012f30

### Principais dependências
1. "@angular/material": "^12.2.11"
2. "ng2-currency-mask": "^12.0.3"

### Executar o projeto
AVISO

> Verifique se você está rodando o node 12.4.0, com o comando node -v em uma janela de terminal / console. As versões mais antigas produzem erros, mas as versões mais recentes funcionam bem.

1. npm install
2. npm start

### Comandos Angular CLI

### Servidor de desenvolvimento

Execute `ng serve` para um servidor de desenvolvimento. Navegue até `http: // localhost: 4200 /`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

### Build

Execute `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist /`.

### Executando testes unitarios

Execute `ng test` para executar os testes de unidade via [Karma](https://karma-runner.github.io).

`ng test --code--coverage` Para acompanhar a cobertura dos testes.
