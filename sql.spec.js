const expect = require('expect');
const queryClass = require('./sql').query;
const person = require('./collections/pessoas');

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
    let sqlResult = query.select().from(person).execute();
    expect(sqlResult).toEqual(person);
    done();
  });
});