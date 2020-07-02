import anyTest, {TestInterface} from 'ava';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/server';
import Short from '../src/models/model';

const mongod = new MongoMemoryServer();
const test = anyTest as TestInterface<{ app: any }>;

/* Create connection to Mongoose before tests are run */
test.before(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

/*  Delete all database entries after each test */
test.afterEach.always( async () => {
    await Short.deleteMany({});
});

/* Add a new short */
test.serial('add short', async t => {
    const res = await request(app)
        .post('/api/create')
        .send({
            url: 'https://google.de/test1'
        });
    t.is(res.status, 200);
    const code = res.body.result.code;
    t.is(code.length, 5);
    const newShort = await Short.findOne({ code: code }) || { url: undefined };
    t.is( newShort.url , 'https://google.de/test1');
});

/* Get URL for added short by code */
test.serial('get short', async t => {
    /* Create test short */
    const short = new Short({
        _id: new mongoose.Types.ObjectId(),
        code: 'abcde',
        count: 0,
        url: 'https://google.de/test',
        addedAt: +new Date(),
      });
    await short.save();
    
    const res = await request(app)
        .get('/api?code=abcde')
    t.is(res.status, 200);
    t.is(res.body.result.url, 'https://google.de/test');
});

/* Add same short again */
test.serial('add short - duplicate', async t => {
    /* Create test short */
    const short = new Short({
        _id: new mongoose.Types.ObjectId(),
        code: 'abcde',
        count: 0,
        url: 'https://google.de/test',
        addedAt: +new Date(),
      });
    await short.save();

    const res = await request(app)
        .post('/api/create')
        .send({
            url: 'https://google.de/test'
        });
    t.is(res.status, 200);
    const code = res.body.result.code;
    t.is(code.length, 5);
});

/* Try to add short with invalid URL */
test.serial('add short - invalid URL', async t => {
    const res = await request(app)
        .post('/api/create')
        .send({
            url: 'saadsadsa'
        });
    t.is(res.status, 400);
});

/* Get URL by none exisiting code */
test.serial('get short - none existing code', async t => {
    const res = await request(app)
        .get('/api?code=aaaaa')
    t.is(res.body.status, 404);
});

/* Get URL by invalid code */
test.serial('get short - invalid code', async t => {
    const res = await request(app)
        .get('/api?code=')
    t.is(res.status, 400);
});

/* Add a new short with human readable code option set to true */
test.serial('add short - with human readable code', async t => {
    const res = await request(app)
        .post('/api/create')
        .send({
            url: 'https://google.de/test2',
            human: true
        });
    t.is(res.status, 200);
    const code = res.body.result.code;
    t.is(code.includes('-'), true);
    const newShort = await Short.findOne({ code: code }) || { url: undefined };
    t.is( newShort.url , 'https://google.de/test2');
});

/* Test if redirect to frontend works */
test.serial('redirect to frontend', async t => {
    const res = await request(app)
        .get('/test')
    t.is(res.status, 200);
    t.is(res.type, 'text/html');
});