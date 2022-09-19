/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')
const app = express();
const port = 5000;

/* importando o modelo */
const modelo = require('./models/modelos');
var Projeto = modelo.Projeto; //Vinculação de tipo
var User = modelo.User;


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './views');

/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/projetos', listProjectHandler);

app.get("/", listPerfil);

app.listen(port, listenHandler);

function listPerfil(req, res) {
    res.render("perfil.ejs")
}

function listProjectHandler(req, res) {
    /* Os dados a seguir, em uma aplicação real, deveriam vir de um BD */
    let projeto_1 = new Projeto("software", "HTML,CSS e PHP", "07/09/2020", "29/11/2020");
    let projeto_2 = new Projeto("software", "HTML,CSS e PHP", "08/03/2021", "06/06/2021");
    let projeto_3 = new Projeto("software", "HTML,CSS e Java", "30/08/2021", "28/11/2021");
    let projeto_4 = new Projeto("software", "React Native", "25/03/2021", "05/06/2021");
    let projetos = [];
    projetos.push(projeto_1);
    projetos.push(projeto_2);
    projetos.push(projeto_3);
    projetos.push(projeto_4);
    res.render('listar_projetos.ejs', { lista_projetos: projetos });
}

function listenHandler() {
    console.log(`Escutando na porta ${port}!`);
}

function listPerfil(req,res){
    let sobreMim = new User ("Higor dos Santos Mariano", "20", "HTML, CSS e React Native", "higor.mariano@fatec.sp.gov.br");
    let sobreMimLista = [];
    sobreMimLista.push(sobreMim);
    res.render("perfil.ejs", {lista_sobreMim: sobreMimLista})
}