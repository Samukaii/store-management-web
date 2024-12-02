# Store Management Web

![Imagem da aplicação](./src/app/docs/illustrations/img.png)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Material Design](https://img.shields.io/badge/material%20design-757575?style=for-the-badge&logo=material%20design&logoColor=white)
## ⭐ Descrição Geral

A **Store Management API** é uma aplicação que oferece funcionalidades completas para o gerenciamento de insumos,
produtos, pedidos e estatísticas de vendas em uma loja. Abaixo estão as principais funcionalidades oferecidas:

### Insumos

- CRUD completo de insumos.
- Cada insumo possui nome e custo.

### Preparos

- Um tipo especial de insumo elaborado, composto por outros insumos.
- O custo de um preparo é calculado automaticamente com base nos insumos associados.

### Produtos

- CRUD completo de produtos.
- Associe insumos e/ou preparos a um produto.
- O custo total do produto será calculado com base nos custos de insumos e preparos.
- A partir do custo total, da margem de lucro desejada e das taxas variáveis um preço sugerido será adicionado ao
  produto,
  ajudando o gerenciador da loja a tomar a melhor decisão de precificação do seu produto.
- A margem de lucro será calculada com base no preço escolhido, nos custos e nas taxas variáveis

### Pedidos

- Visualize e delete pedidos existentes.
- Importe novos pedidos a partir de um arquivo JSON.

### Itens do Pedido

- Cada item está associado a um pedido e também a um produto.

### Estatísticas

- Obtenha informações detalhadas da performance da loja:
	- **Produtos mais vendidos**: Listagem calculada com base nos itens de todos os pedidos.
	- **Vendas por período**: Lista de todas as vendas feitas, agrupadas por dia ou por mês.

---

## Tecnologias utilizadas

- **Angular 19** com **SSR** (Server Side Rendering)
- **ngx-currency** para manipulação de valores monetários.
- **Angular Material 19** para UI componentes com design consistente e responsivo.

## 🚀 Como Rodar a Aplicação com Docker

Siga os passos abaixo para rodar a aplicação utilizando Docker:

1. Ter o docker instalado

2. Rodar o script npm
    ```shell
    npm run docker:run
    ```
   
2. aplicação estará disponível em: http://localhost:4000

## Estrutura de pastas

A estrutura de pastas foi organizada da seguinte maneira:

```yaml
app:
	core:
		environments:
			environment.prod.ts: "Configurações de ambiente para produção"
			environment.ts: "Configurações de ambiente para desenvolvimento"
	pages:
		analytics: "Módulo responsável pelas estatísticas e relatórios da aplicação"
		orders:
			form: "Componentes relacionados à criação de pedidos"
			import: "Funcionalidade para importar pedidos"
			items: "Componente para gerenciar itens dentro de pedidos"
			list: "Exibição de pedidos em lista"
			models: "Modelos de dados para pedidos"
			update: "Componente para atualizar pedidos existentes"
			orders.service.ts: "Serviço responsável pela lógica de negócios de pedidos"
			orders-routes.ts: "Definições das rotas de pedidos"
		preparations:
			"Gerenciamento de preparos feitos a partir de insumos"
		products:
			"Gerenciamento de produtos dentro da loja"
		raw-materials:
			"Gerenciamento de insumos necessários para a produção dos produtos"
	shared:
		components: "Componentes reutilizáveis em toda a aplicação"
		di: "Injeção de dependência para serviços e componentes"
		directives: "Diretivas reutilizáveis para manipulação de elementos DOM"
		helpers: "Funções auxiliares para manipulação de dados"
		models: "Modelos de dados compartilhados entre diferentes partes da aplicação"
```

## Conclusão

A Store Management Web oferece uma interface robusta e intuitiva para gerenciar os diversos aspectos de uma loja. A aplicação foi projetada com desempenho em mente, utilizando técnicas avançadas de detecção de mudanças, como signals e ZoneLessChangeDetection, além de estar integrada com o backend para fornecer funcionalidades completas de CRUD e relatórios de desempenho. O uso de tecnologias modernas como Angular 19, Angular Material e ngx-currency garante uma experiência de usuário ágil e eficiente.

Com a aplicação rodando em Docker, fica ainda mais fácil configurar e implantar o sistema, garantindo portabilidade e flexibilidade no desenvolvimento e produção.
