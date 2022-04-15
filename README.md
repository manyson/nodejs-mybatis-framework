# nodejs-mybatis-framework

## :books: nodejs-mybatis-framework
Node.js 프로그램을 작성할 때 mybatis mapper 를 사용하여 효율적으로 개발 할 수 있도록 공통 기능이 제공되는 framework 제작을 목적으로 합니다.

## Index
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## :airplane: Overview
**위 framework 를 사용하면 아래와 같은 기능들이 포함되어 활용할 수 있습니다.**
* :white_check_mark: Business Login과 SQL를 분리하여 구성할 수 있는 Mybatis
* :white_check_mark: JWT 인증 처리
* :white_check_mark: Swagger 를 사용하여 API 문서 및 테스트 가능
* :white_check_mark: DataBase Connection Pooling
* :white_check_mark: DataBase Transaction
* :white_check_mark: API 요청 전후 처리를 위한 interceptor
* :white_check_mark: logger 를 설정하여 log 기능
* :white_check_mark: 민감정보(비밀번호) 단방향 암호화
* :white_check_mark: 공통 요청, 응답 객체 사용

## :helicopter: Getting Started
### Environment
* **Node.js 버전** - v16.14.2
* **데이터베이스** - MySQL v.8.0.28
* **개발 IDE** - Webstorm

### Configuration
:triangular_flag_on_post: src/.env 파일의 내용을 수정하여 서버의 실행 환경을 수정할 수 있습니다.
```  
# 서버 포트  
SERVER_PORT=3100  
  
# mysql DB 정보  
DB_HOST=127.0.0.1  
DB_PORT=3306  
DB_NAME=MANYSON  
DB_USER=iu00  
DB_PASS=q1w2e3!@  
DB_CONNECTION_LIMIT=10  
  
# JWT 토큰 관련 정보  
SECRET_KEY=M@nYS*n  
ALGORITHM=HS256  
EXPIRE_MIN=30m  
ISSUER=manySon  
```  

### Installing
1. MySQL 를 설치하고 아래의 DDL를 실행하여 테이블을 생성
```mysql  
 CREATE TABLE `TB_USER` ( 
 `user_id` VARCHAR(64) NOT NULL COMMENT '아이디' COLLATE 'utf8mb4_unicode_ci',  
 `user_name` VARCHAR(64) NOT NULL COMMENT '이름' COLLATE 'utf8mb4_unicode_ci',  
 `password` VARCHAR(512) NOT NULL COMMENT '비밀번호' COLLATE 'utf8mb4_unicode_ci',  
 `salt` VARCHAR(512) NOT NULL COMMENT 'SALT' COLLATE 'utf8mb4_unicode_ci', PRIMARY KEY (`user_id`) USING BTREE )
  COLLATE='utf8mb4_unicode_ci' ENGINE=InnoDB;  
```  
2. 모듈 설치 명령어
```  
 npm install
 ```  
3. node 실행
```  
 npm start
```
## :monorail: Swagger
1.  swagger 실행
```
	http://localhost:3100/api-docs/
```
 <img src="https://user-images.githubusercontent.com/18624766/163513264-de7cdfde-06e1-4d9e-857c-4976cf38fcc6.png" width="90%" height="90%">

2. JWT 설정
+ 아래의 API는  로그인  실행 후 응답 데이터의 값을 authorization Value에 설정하여야 정상 처리 됩니다.
    - 사용자 정보 조회
    - 사용자 정보 수정
    - 사용자 정보 삭제

 <img src="https://user-images.githubusercontent.com/18624766/163513581-1e783b44-5aa5-4925-8d29-27fe10145e5b.png" width="85%" height="85%">

 <img src="https://user-images.githubusercontent.com/18624766/163514313-bb00f17d-5ae4-4ba1-9292-dec1d0fb63a7.png" width="85%" height="85%">

## :package: Software architecture
### API 처리 구성도
<img src="https://user-images.githubusercontent.com/18624766/163510910-575912eb-99bd-49b4-9636-27f56df37b15.png" width="85%" height="85%">

###  소스 구성

|  디렉토리           | 내용               | 
|-------------------|--------------------------|
| common | 공통적으로 사용하는 요청, 응답 객체, 상수 등 |
| config | 서버 실행시 필요한 configuration 사항 |
| controller | controller에 해당하는 컴포넌트  |
| database| mybatis 연동 컴포넌트, Connection Pooling, SQL mapper 파일 등 |
| lib| 공통적으로 사용하는 라이브러리 |
| middleware | interceptor 등 middleware 컴포넌트  |
| model| model 컴포넌트 |
| routers| controller를 연동하기 위한 express router  |
| swagger| API 문서를 만들기 위한 yaml 파일  |



## :man_in_tuxedo: Authors
- [iu00](https://github.com/manyson) - **Junghyun Kim** - <artjung77@gmail.com>


## :scroll: License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```  
MIT License  
  
Copyright (c) 2022 iu00  
  
Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  
```