import app from '../src/app';
import request from 'supertest';

describe('GET /tasks', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.statusCode).toBe(200);
  });

  test('should responde with an array', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /tasks', () => {
  describe('given a title and description', () => {
    const data = {
      title: 'Test task',
      description: 'Test description',
    };

    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/tasks').send(data);
      expect(response.statusCode).toBe(200);
    });

    test('should have a content-type: application/json in header', async () => {
      const response = await request(app).post('/tasks').send(data);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('should respond with an data succesfully', async () => {
      const response = await request(app).post('/tasks').send(data);
      expect(response.body.id).toBeDefined();
      expect(response.body.title).toBeDefined();
      expect(response.body.description).toBeDefined();
    });
  });

  describe('when title and description is missing', () => {
    const fields = [{}, { title: '' }, { description: '' }];
    for (const body of fields) {
      test('should respond with a 400 status code', async () => {
        const response = await request(app).post('/tasks').send(body);
        expect(response.statusCode).toBe(400);
      });
    }
  });
});
