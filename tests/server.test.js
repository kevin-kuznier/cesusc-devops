const request = require('supertest');
const app = require('../src/server');

describe('Testes das rotas HTTP', () => {
  test('GET / retorna a calculadora', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Calculadora');
  });

  test('GET /health retorna ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /calcular soma 2 + 3 = 5', async () => {
    const res = await request(app).get('/calcular?a=2&b=3&op=soma');
    expect(res.body.resultado).toBe(5);
  });

  test('GET /calcular divide por zero retorna erro', async () => {
    const res = await request(app).get('/calcular?a=10&b=0&op=divide');
    expect(res.statusCode).toBe(400);
  });
});