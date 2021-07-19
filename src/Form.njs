import Nullstack from 'nullstack';

class Form extends Nullstack {

  email ='';
  senha = '';

  static async readUsuarioById({database, id}){
    const [usuarios] = await database.query('SELECT * FROM usuarios WHERE id=? LIMIT 1', [id]);
    return usuarios[0];
  }

  async initiate({params}){
    if(params.id !== 'new'){
      const usuario = await this.readUsuarioById({id: params.id});
      this.email = usuario.email;
      this.senha = usuario.senha;
    }
  }

  static async creatCadastro({database, email, senha}){
    await database.query(`INSERT INTO usuarios(email, senha) VALUES (?, ?)`, [email, senha])
  }

  static async updateUsuario({database, email, senha, id}){
    await database.query(`UPDATE usuarios SET email=?, senha=? WHERE id=?`, [email, senha, id])
  }

  async submit({router, params}){
    if(params.id === 'new'){
      await this.creatCadastro({
        email: this.email,
        senha: this.senha
      })
    }else{
      await this.updateUsuario({
        id: params.id,
        email: this.email,
        senha: this.senha
      })
    }
    router.url = '/usuarios';
  }

  render() {
    return (
      <div class="container">
       <h1>Cadastro Usuario</h1>
        <form onsubmit={this.submit}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" bind={this.email}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" bind={this.senha}/>
            </div>
            <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
     </div>
    )
  }

}

export default Form;