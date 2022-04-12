1. MySQL Docker 최신 이미지 다운로드
```
$ docker pull mysql
```

Docker 이미지 확인
```
$ docker images
```
```
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
mysql        latest    667ee8fb158e   12 days ago   521MB
```

Docker 컨테이너 실행
```
$ docker run --name mysql-container -e MYSQL_ROOT_PASSWORD={비밀번호} -d -p 3306:3306 mysql:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

MySQL 컨테이너 bash 쉘 접속
```
$ docker exec -it mysql-container bash
```

Mysql 접속
```
root@cbddb2b37114:/# mysql -u root -p
```

데이터 베이스와 사용자 생성, 권한 부여
```
mysql> create database MANYSON;
mysql> CREATE USER 'iu00'@'%' IDENTIFIED BY 'q1w2e3!@';
mysql> GRANT ALL PRIVILEGES ON MANYSON.* TO 'iu00'@'%';
mysql> flush privileges;
```

Redis 이미지 다운로드
```
$ docker pull redis
```

docker network create redis-net



설정 파일 다운로드, 정보 수정

http://download.redis.io/redis-stable/redis.conf
```
bind * -::1
requirepass 패스워드
```


Redis 이미지로 컨테이너 생성
```
$ docker run --name redis-container -d -p 6379:6379 -v D:\tmp\redis\redis.conf:/data/redis.conf redis redis-server /data/redis.conf --appendonly yes
```

docker 접속 후 확인
```
$ docker exec -it redis-container bash
```
```
docker exec -it redis-container redis-cli
```

