import Nullstack from 'nullstack';
import mysql from 'mysql2/promise'

import './Application.scss';

import Form from './Form'
import List from './List'

class Application extends Nullstack {

  static async start(context){
    const {project} = context;
    project.name = 'Crud';
    project.domain = 'nullstack.app';
    
    const database = await mysql.createConnection({
      host: 'localhost',
      database : 'rascunho',
      user: 'root',
      password: '043690',
    })
    try{
      await database.query(`CREATE DATABASE IF NOT EXISTS usuarios`);
      await database.query(`USE usuarios`);
      await database.query(`CREATE TABLE IF NOT EXISTS usuarios(
        id INT NOT NULL AUTO_INCREMENT, 
        email VARCHAR(254), 
        senha VARCHAR(255), 
        PRIMARY KEY (id)
        )
      `)
    }catch(e){
      console.log(e)
    }
    context.database = database;
  }



  prepare({project, page }) {
    page.title = `${project.name} - Esse é o crud`
    page.locale = 'pt-BR';
  }

  render() {
    return (
      <main>
        <head>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
                rel="stylesheet" 
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
                crossorigin="anonymous"
              />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              rel="stylesheet" 
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
              crossorigin="anonymous"
            />
        </head> 
        <List route="/usuarios" />
        <Form route="/usuarios/:id" />
      </main>
    )
  }

}

export default Application;