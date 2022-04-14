/** config file 위치 지정 설정 */
require('dotenv').config(({path : (__dirname + '/config/.env')}));

const express         = require('express');       /** express 모듈 사용  */
const app             = express();
const routes          = require("./routes");      /** router  모듈 사용  */
const swaggerUi       = require('swagger-ui-express');
const YAML            = require('yamljs');        /** yaml              */

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

/** swagger 사용  */
const swaggerDocument = YAML.load(__dirname+'/swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`)
});