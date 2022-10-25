/*
Exemplo de cliente simples que consome dados de um
serviço de persistência (leitura de dados)
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')

/* importando o componente para criação das requests (get)*/
const request = require('request');
const app = express();
const port = 5002;

/* importando o modelo */
const modelo = require('./models/models');
var Projeto = modelo.Projeto; //Vinculação de tipo
var User = modelo.User;


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './src/views'); //Referência a partir do ponto de execução, fora de src


/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('src/public'));

app.get('/projetos', listProjectHandler); //rota q passa como parametro uma func q renderiza os dados mockados da view

app.get("/", listPerfil); //rota index que tem minhas infos pessoais

app.listen(port, listenHandler);


/* Tratador para as requisições de listagens*/
function listProjectHandler(req, resp){
    /* aqui os dados são solicitados a partir do serviço */
    console.log("Efetuando a request ao serviço.");
    let projetos = [];
    request('http://localhost:5001/list', 
            { json: true }, (err, res, body) => {
                if (err) { 
                    return console.log(err); 
                } else {
                    /* build project list: */
                    res.body.forEach((item)=>{
                        let projeto = new Projeto(item.id, item.titulo, item.tipo, 
                                            item.tecnologia, item.inicio, item.fim);
                        projetos.push(projeto);
                    }); 
                    resp.render('listar_projetos',{lista_projetos: projetos});                    
                }               
            });    
}

function listPerfil(req, resp){
    /* aqui os dados são solicitados a partir do serviço */
    console.log("Efetuando a request ao serviço.");
    let perfis = [];
    request('http://localhost:5001/usuario', 
            { json: true }, (err, res, body) => {
                if (err) { 
                    return console.log(err); 
                } else {
                    /* build project list: */
                    res.body.forEach((item)=>{
                        let perfil = new User(item.nome, item.idade, item.linguagens, item.contato);
                        perfis.push(perfil);
                    }); 
                    resp.render('perfil',{lista_perfil: perfis});                    
                }               
            });    
}

/* Tratador para inicializar a aplicação (escutar as requisições)*/
function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}