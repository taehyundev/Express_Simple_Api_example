# Simple APi 만들기

> Api를 좀 더 만드는데 적응하기 위해서 연습

* 1번 참고 사이트
https://www.a-mean-blog.com/ko/blog/Node-JS-API/_/%EA%B8%B0%EB%B3%B8-REST-API-%EB%A7%8C%EB%93%A4%EA%B8%B0

* 2번 참고 사이트
https://ing-yeo.net/2020/02/study-nodejs-create-simple-restful-api-server/


# Branch 분리

* master branch : init 셋팅과 결과물 올림

* develop branch : 기본적으로 작업을 할 branch 

* branch 생성(test)
https://backlog.com/git-tutorial/kr/stepup/stepup2_3.html 

# 2020-08-27
* JSON형태의 데이터를 보내면 받아서 DB로 변경하는 api - post요청(Postman으로 실험 완료)

# 2020-08-28
* url의 주소에 따라 sql 정보를 받아옴 - get요청(Postman으로 실험 완료)

# 2020-08-29
* url의 주소에 따라 parms.no 의 정보의 no 과 매치되는 query 의 정보를 업데이트 - put요청(Postman으로 실험 완료)

# 2020-08-29
* url의 주소에 따라 parms.no 의 정보의 no 과 매치되는 query 의 정보를 삭제 - delete요청(Postman으로 실험 완료)
    +query_increment_reset()를 제작하여 삭제시 no 번호가 중간에 비는 오점 해결

# 2020-08-31
* cors 문제해결 보안 정책 문제였음

```javascript
app.use(function(req, res, next) {
    
    //cors 보안정책
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// use로 헤더올리는데 현재는 * 로 해서 보안성이 약함 그 이후 next로 다음 app.use를 실행
```

* client 로 정상 작동
