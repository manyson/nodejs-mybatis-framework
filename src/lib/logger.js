const winston       = require('winston');
const winstonDaily  = require('winston-daily-rotate-file');

const path = require('path');

// dotenv 통한 환경설정값 추출
const LOG_DIR = path.join(__dirname, '..', '..', process.env.LOG_DIRECTORY || 'logs');

// 기본 로그 형식
const { combine, timestamp, printf } = winston.format;

// Define log format
const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIR,
      filename: `%DATE%.log`,
      maxFiles: 30,  // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIR + '/error',  // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등)
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),   /**  색생 출력 */
      winston.format.simple(),     /** `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력 */
    )
  }));
}

module.exports = logger;
