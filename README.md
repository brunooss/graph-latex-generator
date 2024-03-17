# Gerador de Grafos para Exportação para LaTeX

# Escopo
O projeto consiste em uma aplicação (web/multi-plataforma) para a geração de grafos a partir da entrada do usuário, com a possibilidade de exportação de código ```LaTeX``` e de imagem em formato ```.png```. Além da geração a partir da entrada manual, o usuário pode selecionar grafos predefinidos (ex.: grafo completo com N vértices, grafo bipartido, etc.).

### Features do Sistema

- [ ] O usuário deve ser capaz de adicionar um grafo (em linguagem matemática ou com ferramenta gráfica da interface)
- [ ] O usuário deve poder, durante a seleção, definir se o grafo é direcionado ou não
- [ ] O usuário deve ser capaz de selecionar um grafo dentre uma coleção de grafos predefinidos
- [ ] O usuário, após selecionar ou adicionar um grafo, deve ser capaz de editá-lo, adicionando/removendo vértices e arestas
- [ ] O usuário deve poder editar as cores de cada vértice
- [ ] O usuário deve ser capaz de exportar o grafo gerado em formato ```.png```
- [ ] O usuário deve ter acesso ao código ```LaTeX``` do grafo gerado pelo sistema
- [ ] O usuário deve ser capaz de acessar o histórico de grafos gerados anteriormente, bem como de seus códigos ```LaTeX```
- [ ] O usuário deve ser capaz de criar uma conta (com email e senha) a fim de salvar o conteúdo gerado
- [ ] O usuário deve poder acessar as funcionalidades do sistema a partir de múltiplos dispositivos, mediante criação de conta e autenticação prévia

### Membros da Equipe

- Bruno Oliveira [@brunooss](https://github.com/brunooss): desenvolvedor _full-stack_
- Laila Melo [@lailamvl](https://github.com/lailamvl): desenvolvedora _full-stack_
- Thiago [@trassis](https://github.com/trassis): desenvolvedor _full-stack_
- 

### Tecnologias

O sistema contará com uma interface web/mobile, que será desenvolvida com _React_ e _Typescript_, além de um backend _serverless_ baseado em _Node.js_ servido pelo _Firebase Functions_ e um bando de dados NoSQL hospedado em nuvem servido pelo _Firebase Firestore_.
