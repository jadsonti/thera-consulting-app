# Aplicação de Gerenciamento de Produtos

Aplicação web de gerenciamento de produtos desenvolvida com Next.js e TypeScript.

## Funcionalidades

- **Listagem de Produtos**: Visualizar todos os produtos com Nome, Categoria, Preço, Descrição e Imagem
- **Cadastro de Produtos**: Formulário para adicionar novos produtos ao inventário
- **Filtros**: Busca por nome e faixa de preço (mínimo/máximo)
- **Ordenação**: Ordenar resultados por nome, preço ou categoria (crescente/decrescente)
- **Paginação**: Navegação entre páginas de resultados
- **Design Responsivo**: Layout adaptável para diferentes tamanhos de tela

## Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Estilização utilitária e responsiva
- **Zustand** - Gerenciamento de estado global leve e simples
- **Jest + React Testing Library** - Testes automatizados
- **Axios** - Cliente HTTP para consumo de APIs

## Escolhas Técnicas

### Por que Zustand ao invés de Redux?

- **Simplicidade**: Menos boilerplate, sem necessidade de actions/reducers separados
- **Performance**: Renderizações otimizadas por padrão
- **TypeScript**: Excelente suporte a tipagem nativo

### Por que Next.js App Router?

- **Route Handlers**: API mock integrada sem necessidade de servidor externo
- **Server Components**: Melhor performance e SEO
- **Convenções modernas**: Estrutura de pastas intuitiva

### Estrutura do Estado (Zustand Store)

- Produtos e filtros centralizados em um único store
- Derivação de dados filtrados via computed properties
- Separação clara entre estado e ações

## Getting Started

### Prerequisitos

- Node.js (version 14 or higher)
- npm or yarn

### Instalação

1. Clone the repository:

   ```
   git clone https://github.com/jadsonti/thera-consulting-app.git
   ```

2. Navigate to the project directory:

   ```
   cd thera-consulting-app
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

or

```
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Running Tests

To run the tests, use:

```
npm test
```

or

```
yarn test
```

## Folder Structure

```
product-management-app
├── src
│   ├── app
│   ├── components
│   ├── hooks
│   ├── store
│   ├── services
│   ├── types
│   ├── lib
│   └── constants
├── __tests__
├── public
├── .env.local.example
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
