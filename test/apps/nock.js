var nock = require('nock');

nock('http://ourhost.com')
  .post('/v2/users/me@me.com/tokens', {"password":"mypassword"})
  .reply(200, "{\"token\":\"bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEzNzcxMDg0NzEsInVzZXJfbmFtZSI6Im1lQG1lLmNvbSIsInNjb3BlIjpbImNsb3VkX2NvbnRyb2xsZXIucmVhZCIsImNsb3VkX2NvbnRyb2xsZXIud3JpdGUiLCJvcGVuaWQiLCJwYXNzd29yZC53cml0ZSJdLCJlbWFpbCI6Im1lQG1lLmNvbSIsImF1ZCI6WyJvcGVuaWQiLCJjbG91ZF9jb250cm9sbGVyIiwicGFzc3dvcmQiXSwianRpIjoiYWM5ZjkyYTQtYjFkNS00YTZlLTk3ZDItYjRkNDVhMGYyMzM2IiwidXNlcl9pZCI6Ijg1OTY4YzA2LWZjMGEtNGNkOS04NmJiLWZjM2RjNjRkZTkwZCIsImNsaWVudF9pZCI6InZtYyJ9.vvDkp2_41HhgQobm-oD_uSy0NZhY0JYAoAJJg7bDTiA\"}", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:08 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  etag: '"ef04b674cebf16133664322b19b74405"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'x-ua-compatible': 'IE=Edge,chrome=1' });

nock('http://ourhost.com')
  .get('/v2/apps?page=1')
  .reply(200, "[]", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:08 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  etag: '"d751713988987e9331980363e24189ce"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .get('/v2/apps/testapp')
  .reply(404, "{\"code\":301,\"description\":\"Application not found\"}", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:09 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  'cache-control': 'no-cache',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .post('/v2/apps', {"name":"testapp", "space_guid": "12abcf34-5de6-789-01f2-b34567d8b9f0","staging":{"model":"node","stack":"node0815"},"uris":["testapp.ourhost.com"],"resources":{"memory":64},"instances":1})
  .reply(302, "{\"result\":\"success\",\"redirect\":\"http://ourhost.com/apps/testapp\"}", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:09 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  location: 'http://ourhost.com/apps/testapp',
  'cache-control': 'no-cache',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .get('/v2/apps/testapp')
  .reply(200, "{\"name\":\"testapp\",\"space_guid\": \"12abcf34-5de6-789-01f2-b34567d8b9f0\",\"staging\":{\"model\":\"node\",\"stack\":\"node0815\"},\"uris\":[\"testapp.ourhost.com\"],\"instances\":1,\"runningInstances\":0,\"resources\":{\"memory\":64,\"disk\":2048,\"fds\":256},\"state\":\"STOPPED\",\"services\":[],\"version\":\"2a7fa52e815a7cbd5cea5e223349ae38-0\",\"env\":[],\"meta\":{\"debug\":null,\"console\":null,\"version\":1,\"created\":1376514310}}", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:10 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  etag: '"55d967a69b5292eeda27fa188575b9e2"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .delete('/v2/apps/testapp')
  .reply(200, " ", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:10 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  'cache-control': 'no-cache',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .delete('/v2/apps/[object%20Object]')
  .reply(404, "{\"code\":301,\"description\":\"Application not found\"}", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:10 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  'cache-control': 'no-cache',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .get('/v2/apps?page=1')
  .reply(200, "[]", { server: 'nginx',
  date: 'Wed, 14 Aug 2013 21:05:11 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  etag: '"d751713988987e9331980363e24189ce"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .get('/v2/apps/testapp/summary')
  .reply(200, "{\"name\": \"testapp\",\"services\": [{\"guid\": \"00aeef00-0ea0-0000-00a0-b00000d0b0f0\",\"name\": \"test-mongodb\",\"bound_app_count\": 0,\"dashboard_url\": \"null\",\"service_plan\": {\"guid\": \"afbd0ff0-00f0-0000-bd00-0000000d0000\",\"name\": \"000\",\"service\": {\"guid\": \"000e00ed-0ea0-000a-b00c-bcca000000bb\",\"label\": \"mongodb\",\"provider\": \"core\",\"version\": \"2.2\"}}}],\"available_domains\": [{\"guid\": \"d00c00d0-0000-00cd-0f00-000a000b0000\",\"name\": \"testapp.ourhost.com\",\"owning_organization_guid\": \"null\"}],\"production\": \"false\",\"memory\": \"64\",\"instances\": \"1\",\"disk_quota\": \"1024\",\"state\":\"STARTED\",\"version\": \"a0c00000-000e-0e0d-b00a-0fcf000ffa00\",\"command\": \"node index.js\",\"console\": \"true\", \"debug\": \"null\", \"staging_task_id\": \"dc0e0d00de0d0000000e00000a00ec00\"}", { server: 'nginx',
  date: 'Wed, 21 Aug 2013 10:14:33 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  etag: '"12d345a67b8901eeda23fa456789b0e1"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'x-ua-compatible': 'IE=Edge,chrome=1' });


nock('http://ourhost.com')
  .get('/v2/apps/testapp/stats')
  .reply(200, "{\"0\": {\"state\": \"RUNNING\",\"stats\": {\"name\": \"testapp\",\"uris\": [\"testapp.ourhost.com\"],\"host\": \"192.168.0.1\",\"port\": 80808,\"uptime\": \"12345\",\"mem_quota\": \"18096378\",\"disk_quota\": \"109799792\",\"fds_quota\": \"12345\",\"usage\": {\"time\": \"2013-08-21 12:20:20 +0000\",\"cpu\": \"0.5930243289836699\",\"mem\": \"19011865\",\"disk\": \"17881456\"}}}}", { server: 'nginx',
  date: 'Wed, 21 Aug 2013 12:20:20 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  connection: 'keep-alive',
  'keep-alive': 'timeout=20',
  etag: '"12d345a67b8901eeda23fa456789b0e1"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'x-ua-compatible': 'IE=Edge,chrome=1' });