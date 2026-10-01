const {
 adicionarLivro, pesquisarLivros
} = require("../js/livros");
test("deve adicionar um livro à coleção", () => {
 const livros = [];
 const livro = {
 id: 1,
 titulo: "JavaScript",
 autor: "Autor",
 genero: "Programação",
 paginas: 300,
 lido: false
 };
 const resultado = adicionarLivro(livros, livro);
 expect(resultado).toHaveLength(1);
 expect(resultado[0]).toEqual(livro);
});
test("deve encontrar livros pelo id", () => {
 const livros = [
 {
 id: 1,
 titulo: "JavaScript",
 autor: "Autor A",
 genero: "Programação",
 paginas: 300,
 lido: false
 },
 {
 id: 2,
 titulo: "HTML e CSS",
 autor: "Autor B",
 genero: "Web",
 paginas: 250,
 lido: true
 }
 ];
 const resultado = pesquisarLivros(
 livros,
 "javascript"
 );
 expect(resultado).toHaveLength(1);
 expect(resultado[0].id).toBe("1");
});