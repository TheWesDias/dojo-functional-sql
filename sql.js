class query {

  constructor(){
    this.colecao = [];
    this.resultado = [];
    this.campo = null;
    this.condicao = null;
    this.filtrarCampos = function (linha) {
      if (this.campo && typeof this.campo == 'string') {
        this.resultado.push(linha[this.campo]);
      } else if (this.campo && typeof this.campo != 'string') {
        let pessoa = {};
        for (var i = 0; i < this.campo.length; i++) {
          pessoa[this.campo[i]] = linha[this.campo[i]];
        }
        this.resultado.push(pessoa);
      } else {
        this.resultado.push(linha);
      }
      return this.resultado;
    };

  }
  select(campo) {
    if (campo) {
      this.campo = campo;
    }
    return this;
  }
  
  from(colecao) {
    this.colecao = colecao;
    return this;
  }

  where(condicao) {
    this.condicao = condicao;
    return this;
  }
  
  execute() {
    // where
    if(this.condicao){
      for(var indice in this.colecao){
        var linha = this.colecao[indice];
        if(this.condicao(linha)){
          this.filtrarCampos(linha);
        }
      }
      return this.resultado;
    }
    // select campo from
    if (this.campo) {
      for (var indice in this.colecao) {
        var linha = this.colecao[indice];
        this.filtrarCampos(linha);
      }
      return this.resultado;
    }
    // select * from
    return this.colecao;
  }

}

module.exports = {
  query: query
};