
class Projeto {
    constructor(titulo, tipo, tecnologia, inicio, fim){
        this.titulo = titulo;
        this.tipo = tipo;
        this.tecnologia = tecnologia;
        this.inicio = inicio;
        this.fim = fim;
   }
}

class User {
    constructor(nome, idade, linguagens, contato) {
        this.nome = nome;
        this.idade = idade;
        this.linguagens = linguagens;
        this.contato = contato;
    }
}

module.exports = {
    Projeto: Projeto,
    User: User
}