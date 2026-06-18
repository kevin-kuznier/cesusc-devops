const { soma, subtrai, multiplica, divide } = require('../src/calc');

describe('Testes de unidade - Calculadora', () => {
  test('soma 2 + 3 = 5', () => {
    expect(soma(2, 3)).toBe(5);
  });

  test('subtrai 10 - 4 = 6', () => {
    expect(subtrai(10, 4)).toBe(6);
  });

  test('multiplica 3 * 4 = 12', () => {
    expect(multiplica(3, 4)).toBe(12);
  });

  test('divide 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divisao por zero lanca erro', () => {
    expect(() => divide(10, 0)).toThrow('Divisao por zero nao permitida');
  });
});
