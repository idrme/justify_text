import { describe, it, expect } from 'vitest'
import { justifyText } from '../src/utils/justifyText.js'

import app  from '../src/app.js';
import request from 'supertest';

// Test unitaire
describe('justifyText()', () => {
  it('verifies if the text is ok', () => {
    expect(justifyText(`Hello world! Hello world! Hello world! Hello world!`)).toBe(`Hello world! Hello world! Hello world! Hello world!`)
  })
})

// Test d'intégration
describe('POST /api/token', () => {
  it('should return 200', async () => {
    const res = await request(app)
      .post('/api/token')
      .send({ email: 'tesaaat@mail.com' });

    expect(res.status).toBe(200);
  });
});