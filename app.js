/*
 * @Author: ztao
 * @Date: 2022-01-10 11:20:46
 * @LastEditTime: 2022-01-10 11:55:33
 * @Description: 接口操作ip-pool
 */
const path = require('path');
const express = require('express');
const app = express();
const redis = require(path.join(__dirname, './redis'));
const log = require(path.join(__dirname, './log'));
const port = 3000;

//解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//解析application/json
app.use(express.json());

//初始化IP池
app.post('/proxy/init/hk', (req, res) => {
  try {
    let data = req.body;
    if (Object.prototype.toString.call(data) == '[object Array]') {
      //存到redis里面
      redis.set('ipPool', JSON.stringify(data));
      log.info('存储到redis成功');
      //返回结果
      res.send({
        code: '0000',
        msg: '初始化IP池成功!'
      });
    } else {
      //返回结果
      res.send({
        code: '9999',
        msg: '请传入JSON数组!'
      });
    }
  } catch (err) {
    log.error(err.message);
    res.send({
      code: '9999',
      msg: err.message
    });
  }
});
//获取IP池
app.get('/proxy/get/hk', async (req, res) => {
  let dataStr = await redis.get('ipPool');
  let data = new Function(`return ${dataStr}`)();
  let firstData = data.splice(0, 1)[0];
  firstData.useCount++;
  data.push(firstData);
  //存到redis里面
  redis.set('ipPool', JSON.stringify(data));
  res.send({
    code: '0000',
    data: firstData
  });
});

//预览IP池
app.get('/proxy/preview/hk', async (req, res) => {
  let dataStr = await redis.get('ipPool');
  let data = new Function(`return ${dataStr}`)();
  res.send({
    code: '0000',
    data: data
  });
});

app.listen(port, () => {
  log.info(`ip-pool app listening at http://localhost:${port}`);
});
