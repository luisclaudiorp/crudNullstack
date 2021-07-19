import Nullstack from 'nullstack';

class List extends Nullstack {

  usuarios = [];

  static async readUsuarios({database}){
    const [usuarios] = await database.query('SELECT * FROM usuarios');
    return usuarios;
  }

  async initiate(){
    this.usuarios = await this.readUsuarios();
  }

  static async deleteUsuario({database, id}){
    await database.query('DELETE FROM usuarios WHERE id=?', [id]);
  }

  async delete({usuario}){
    await this.deleteUsuario({id: usuario.id});
    await this.initiate();
  }
  
  render() {
    return (
      <div class='container'> 
          <table class="table table-striped">
            <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Email</th>
                  <th scope="col" style='width:2px'></th>
                  <th scope="col" style='width:2px'></th>
                </tr>
            </thead>
                <tbody>
                  {this.usuarios.map((usuario)=> 
                      <tr>
                        <th scope="row">{usuario.id}</th>
                        <td>{usuario.email}</td>
                        <td>
                          <button class='btn btn-sm btn-danger' onclick={this.delete} usuario={usuario}>
                            <i class='fas fa-tash' />
                          </button>
                        </td>
                        <td>
                          <a href={`/usuarios/${usuario.id}`} class='btn btn-sm btn-primary'>
                            <i class='fas fa-edit' />
                          </a>
                        </td>
                      </tr>
                  )}
                </tbody>
            </table>
            <a href="/usuarios/new" class='btn btn-primary'>Novo Usuario</a>
        </div>
    )
  }
}

export default List;