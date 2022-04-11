/** config file 위치 지정 설정 */
require('dotenv').config(({path : (__dirname + '/config/.env')}));

const express         = require('express');       /** express 모듈 사용  */
const app             = express();
const routes          = require("./routes");      /** router  모듈 사용  */

const PreInterceptor  = require('./middleware/PreInterceptor');
const PostInterceptor = require('./middleware/PostInterceptor');

/** express 에서 JSON Request Body parsing  */
app.use(express.json());

/** 전처리 interceptor */
app.use(PreInterceptor);

/** 후처리 interceptor */
app.use(PostInterceptor);

/** 라우트 등록  */
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`app listening on port ${process.env.SERVER_PORT}`)
});