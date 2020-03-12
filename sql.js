class query {
  constructor(){
    this.colecao = [];
  }
  
  select() {
    return this;
  }
  
  from(colection) {
    this.colecao = colection;
    return this;
  }
  
  execute() {
    return this.colecao;
  }
}

module.exports = {
  query: query
};