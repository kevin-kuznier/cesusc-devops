const request = require('supertest');
const app = require('../src/server');

describe('Testes das rotas HTTP', () => {
  test('GET / retorna pagina com titulo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Aplicacao N3');
  });

  test('GET /health retorna ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /soma?a=2&b=3 retorna 5', async () => {
    const res = await request(app).get('/soma?a=2&b=3');
    expect(res.body.resultado).toBe(5);
  });
});
