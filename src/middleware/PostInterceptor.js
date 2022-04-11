// 후처리 interceptor
const Logger              = require('../lib/logger')          ;
const DataLogger          = require('../lib/dataLogger')      ;
const AWS                 = require("aws-sdk")                ;

const moment              = require("moment-timezone")        ;
const S3Config            = require('s3-append').S3Config     ;
const S3Append            = require('s3-append').S3Append     ;
const Format              = require('s3-append').Format       ;

const { S3 }              = require("../common/Constant")     ;
const { CHAR_SYMBOL}      = require("../common/Constant")     ;
const { DATA_FIELD_NAME } = require("../common/Constant")     ;
const { DATE_FORMAT }     = require("../common/Constant")     ;
const { REGEX_PATTERN }   = require("../common/Constant")     ;
const { ENVIRONMENT }     = require("../common/Constant")     ;


const PostInterceptor = async (req, res, next) =>{

  const oldSend = res.send;

  // response overriding
  res.send = async (responseData) => {

    console.log(`res.send`);
    console.log(responseData);

    // 여기 부터
    if(typeof responseData !== 'object'){
      res.send = oldSend ;
      return res.send(responseData);
    }

    // 암호화 여부 체크
    const secure      = responseData.getSecure();

    // 응답 데이터
    const data        = responseData.getData();

    // 요청 데이터
    const requestData = responseData.getRequestData();

    // 요청 데이터가 있는 경우
    if(requestData){

      const isConnected = requestData.isConnected();

      // 연결 상태인 경우
      if(isConnected === true){

        Logger.error(`No Database released ${req.originalUrl} method ${req.method}`);

        requestData.end(responseData.isSuccess());
      }

      // 로그가 있는 경우 작성
      if(requestData.isLogData()){

        // 서비스 환경 Development, QA, GS, Production
        let dns           = process.env.SERVER_DNS                      ;
        if(dns.match(REGEX_PATTERN.APP)) {
          dns             = ENVIRONMENT.PRODUCTION                      ;
        }
        else if(dns.match(REGEX_PATTERN.QA)) {
          dns             = ENVIRONMENT.QA                              ;
        }
        else if(dns.match(REGEX_PATTERN.GS)) {
          dns             = ENVIRONMENT.GS                              ;
        }
        else {
          dns             = ENVIRONMENT.DEVELOPMENT                     ;
        }

        // S3 Log File name
        const s3LogKey = `${dns}/data/${moment(Date.now()).format(DATE_FORMAT.YYYY_MM_DD)}.log`;

        // s3 연동
        const s3                    = new AWS.S3({
          [S3.ACCESS_KEY]           : process.env.S3_IMTRIAL_ACCESS_KEY         ,
          [S3.SECRET_KEY]           : process.env.S3_IMTRIAL_SECRET_ACCESS_KEY  ,
          [S3.REGION]               : process.env.S3_IMTRIAL_REGION
        });

        // Log File 이 존재하는지 여부 판단을 위한 파라미터
        const headerParams = {
          [S3.BUCKET_CAPITAL]       : process.env.S3_IMTRIAL_LOG_BUCKET  ,
          [S3.KEY_CAPITAL]          : s3LogKey
        }

        const checkLogFile = async () => {

          try {

            // headObject 가 존재하지 않는 다면 파일이 없다는 뜻
            await s3.headObject(headerParams).promise();

            // add Log to S3
            await appendS3Log();
          }
          catch (headErr) {
            if (headErr.code === DATA_FIELD_NAME.NOT_FOUND) {

              /* Log File 이 없는 경우 빈 파일 업로드
              S3 Append 는 파일이 생성되어 있어야 이어붙일 수 있다.
              존재하지 않는 파일인 경우 The specified key does not exist. Error */

              // S3 Parameter
              const uploadParam           = {
                [S3.BUCKET_CAPITAL]       : process.env.S3_IMTRIAL_LOG_BUCKET  ,
                [S3.KEY_CAPITAL]          : s3LogKey                           ,
                [S3.BODY]                 : CHAR_SYMBOL.EMPTY                  ,
                [S3.CONTENT_TYPE_CAPITAL] : S3.PLAIN_TEXT                      ,
                [S3.ACL_CAPITAL]          : S3.PUBLIC_READ
              }

              // S3 Upsert
              const upsertS3 = async () => {
                await s3.putObject(uploadParam).promise()
                return S3.HTTPS + uploadParam[S3.BUCKET_CAPITAL] + S3.S3_ADDR + CHAR_SYMBOL.SLASH + uploadParam[S3.KEY_CAPITAL];
              }
              await upsertS3();

              // add Log to S3
              await appendS3Log();
            }
          }
        }

        // S3 Log 쌓기 함수
        const appendS3Log = () => {

          // S3 log file 에 이어 붙이기 위한
          const config        = new S3Config({
            [S3.ACCESS_KEY]  : process.env.S3_IMTRIAL_ACCESS_KEY         ,
            [S3.SECRET_KEY]  : process.env.S3_IMTRIAL_SECRET_ACCESS_KEY  ,
            [S3.REGION]      : process.env.S3_IMTRIAL_REGION             ,
            [S3.BUCKET]      : process.env.S3_IMTRIAL_LOG_BUCKET         ,
            [S3.ACL]         : S3.PUBLIC_READ
          });

          // S3 Append 를 사용하지 않는 경우 하나의 요청이 S3 에 하나의 버전파일로 올라간다
          const service = new S3Append(config, s3LogKey, Format.Json);

          // get Log
          const stringifiedLog = requestData.getLogString();

          // log to S3
          service.append(stringifiedLog);

          service.flush()
            .then(function() {
              // console.log("Data Logging Done!");
            })
            .catch(function(e) {
              Logger.error(e.stack);
            });
        }

        // 정해진 이름의 Log File 존재여부 판단
        await checkLogFile();

        // log to winston-daily-rotate
        DataLogger.info(requestData.getLogString());
      }
    }

    /** todo
     *  암호화 기능 추가
     */
    if(secure === true){

    }
    else{

    }
    // 기존 send function을 변경
    res.send = oldSend              ;
    return res.send(data)           ;
  }

  next()                            ;
}                                   ;

module.exports = PostInterceptor    ;
