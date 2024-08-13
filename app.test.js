import request from 'supertest';
import app from './app.js';

describe('App Test', () => {
  test('GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('json');
    expect(res.body.info).toBeDefined();
    expect(res.body.info).toBe('Journal API!!');
  });

  describe('POST /entries', () => {
    let res, postBody

    beforeAll(async () => {
        const cats = await request(app).get('/categories')
        postBody = {
            content: 'Hello from jest',
            category: cats.body[0]._id
        }
        res = await request(app).post('/entries').send(postBody)


    })

    afterAll(async () => {
    // Cleanup
    request(app).delete(`/entries/${res.body._id}`);
    })


    const cats = await request(app).get('/categories');
    const req = await request(app).post('/entries');
    const res = req.send({
      content: 'Hello from jest',
      category: cats[0]._id,
    });

    test('Successfully return JSON content', async () => {
        expect(res.status).toBe(201);
        expect(res.headers['content-type']).toContain('json');
      });

      test('Returned entry has an _id, content and category', async () => {
        expect(res.body._id).toBeDefined();
        expect(res.body.content).toBeDefined();
        expect(res.body.category).toBeDefined();
      });

      test('Returned entry has the expected values for content and category', async () => {
        expect(res.body.content).toEqual.objectContaining(postBody)
      })


  });

  describe('GET /categories', () => {
    let res;
    beforeAll(async () => {
      res = await request(app).get('/categories');
    });

    test('Successfully return JSON content', async () => {
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('json');
    });

    test('Returns an array with 4 elements', async () => {
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(4);
    });

    test('First category has _id and name', async () => {
      const cat = res.body[0];
      expect(cat._id).toBeDefined();
      expect(cat.name).toBeDefined();
    });

    test('List of categories contains an object of food', async () => {
      expect(res.body).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'Food' })])
      );
    });
  });
});
