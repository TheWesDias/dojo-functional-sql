const expect = require('expect');
const queryClass = require('./sql').query;
const pessoas = require('./collections/pessoas');

describe('deve testar o functional sql', () => {
  it('deve executar o select from basico', done => {
    let numbers = [1, 2, 3];
    let query = new queryClass();
    let sqlResult = query.select().from([1,2,3]).execute();
    expect(sqlResult).toEqual([1,2,3]);
    done();
  });
  it('deve selecionar todas as pessoas', done => {
    let query = new queryClass();
    let sqlResult = query.select().from(pessoas).execute();
    expect(sqlResult).toEqual(pessoas);
    done();
  });
  it('deve selecionar apenas o campo profession da tabela pessoas', done => {
    let query = new queryClass();
    let sqlResult = query.select('profession').from(pessoas).execute();
    expect(JSON.stringify(sqlResult)).toEqual(JSON.stringify(['teacher','teacher','teacher','scientific','scientific','scientific','politician']));
    done();
  });
  it('deve selecionar com filtro where vazio', done => {
    let query = new queryClass();
    let sqlResult = query.select().from(pessoas).where().execute();
    expect(sqlResult).toEqual(pessoas);
    done();
  });
  it('deve selecionar com filtro de profession retornando apenas o campo name', done => {
    let query = new queryClass();
    let condicao = function (linha) {
      return linha.profession == 'teacher';
    };
    let sqlResult = query.select('name').from(pessoas).where(condicao).execute();
    expect(sqlResult.length).toEqual(3);
    expect(sqlResult[0]).toEqual('Peter');
    expect(sqlResult[1]).toEqual('Michael');
    expect(sqlResult[2]).toEqual('Peter');
    done();
  });
  it('deve selecionar com filtro de profession, retornando apenas o campo profession', done => {
    let query = new queryClass();
    let condicao = function (linha) {
      return linha.profession == 'teacher';
    };
    let sqlResult = query.select('profession').from(pessoas).where(condicao).execute();
    expect(sqlResult.length).toEqual(3);
    expect(sqlResult[0]).toEqual('teacher');
    expect(sqlResult[1]).toEqual('teacher');
    expect(sqlResult[2]).toEqual('teacher');
    done();
  });
  it('deve selecionar dois campos ao mesmo tempo com where', done => {
    let query = new queryClass();
    let condicao = function (linha) {
      return linha.profession == 'teacher';
    };
    let sqlResult = query.select(['name', 'age']).from(pessoas).where(condicao).execute();
    expect(sqlResult.length).toEqual(3);
    expect(sqlResult[0]).toEqual({'name':'Peter', 'age': 20});
    expect(sqlResult[1]).toEqual({'name':'Michael', 'age': 50});
    expect(sqlResult[2]).toEqual({'name':'Peter', 'age': 20});
    done();
  });
  it('deve selecionar 3 campos ao mesmo tempo com where', done => {
    let query = new queryClass();
    let condicao = function (linha) {
      return linha.profession == 'teacher';
    };
    let sqlResult = query.select(['name', 'age', 'profession']).from(pessoas).where(condicao).execute();
    expect(sqlResult.length).toEqual(3);
    expect(sqlResult[0]).toEqual({'name':'Peter', 'age': 20, 'profession': 'teacher'});
    expect(sqlResult[1]).toEqual({'name':'Michael', 'age': 50, 'profession': 'teacher'});
    expect(sqlResult[2]).toEqual({'name':'Peter', 'age': 20, 'profession': 'teacher'});
    done();
  });
  it('deve selecionar dois campos ao mesmo tempo sem where', done => {
    let query = new queryClass();
    let condicao = function (linha) {
      return linha.profession == 'teacher';
    };
    let sqlResult = query.select(['name', 'age', 'profession']).from(pessoas).execute();
    expect(sqlResult.length).toEqual(7);
    expect(sqlResult[0]).toEqual({
      'name':'Peter',
      'age': 20,
      'profession': 'teacher'
    });
    expect(sqlResult[6]).toEqual({
      "name": "Anna", 
      "profession": "politician", 
      "age": 50
    });
    done();
  });
  it('deve selecionar com filtro de profession, retornando todos os campos', done => {
    let query = new queryClass();
    let condicao = function (linha) {
      return linha.profession == 'teacher';
    };
    let sqlResult = query.select().from(pessoas).where(condicao).execute();
    expect(sqlResult.length).toEqual(3);
    expect(sqlResult[0]).toEqual({
      "name": "Peter", 
      "profession": "teacher", 
      "age": 20, 
      "maritalStatus": "married"
    });
    expect(sqlResult[1]).toEqual({
      "name": "Michael", 
      "profession": "teacher", 
      "age": 50, 
      "maritalStatus": "single"
    });
    expect(sqlResult[2]).toEqual({
      "name": "Peter", 
      "profession": "teacher", 
      "age": 20, 
      "maritalStatus": "married"
    });
    done();
  });

});