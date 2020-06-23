import anyTest, {TestInterface} from 'ava';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/server';
import Short from '../src/models/model';

const mongod = new MongoMemoryServer();
const test = anyTest as TestInterface<{ app: any }>;

/* Test values */
const testCode = 'abcde';
const testUrl = 'https://google.de/test';

/* Create connection to Mongoose before tests are run */
test.before(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

/* Add express app to context */
test.beforeEach(async (t) => {
    t.context.app = app;
});

/* Delete all database entries after each test */
test.afterEach.always( async () => {
    await Short.deleteMany({});
});

test.serial('get short', async t => {
    const { app } = t.context;
    
    /* Create test short */
    const short = new Short({
        _id: new mongoose.Types.ObjectId(),
        code: testCode,
        count: 0,
        url: testUrl,
        addedAt: +new Date(),
      });
    await short.save();

    /* Send supertest request */
    const res = await request(app)
        .get('/api?code=' + testCode)
    
    /* Verify response status and the returned short url */
    t.is(res.status, 200);
    t.is(res.body.result.url, testUrl);
});

test.serial('add short', async t => {
    const { app } = t.context;

    /* Send supertest request */
    const res = await request(app)
        .post('/api/create')
        .send({
            url: testUrl
        });

    /* Verify response status and short code length */
    t.is(res.status, 200);
    const code = res.body.result.code;
    t.is(code.length, 5);

    /* Verify that user is created in DB */
    const newShort = await Short.findOne({ code: code }) || { url: undefined };
    t.is( newShort.url , testUrl);
});