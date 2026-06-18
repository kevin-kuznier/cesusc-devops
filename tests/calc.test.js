const { soma, subtrai } = require('../src/calc');

describe('Testes de unidade - calc', () => {
  test('soma 2 + 3 deve ser 5', () => {
    expect(soma(2, 3)).toBe(5);
  });

  test('soma com numeros negativos', () => {
    expect(soma(-1, -1)).toBe(-2);
  });

  test('subtrai 10 - 4 deve ser 6', () => {
    expect(subtrai(10, 4)).toBe(6);
  });
});
