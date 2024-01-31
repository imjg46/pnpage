const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

// Create 페이지
app.get('/create', async (req, res) => {
    const createPage = await fs.readFile(path.join(__dirname, 'views', 'create.html'), 'utf8');
    res.send(createPage);
});

// Create 페이지에서 POST 요청을 처리하여 페이지 생성 및 URL 변환
app.post('/create', async (req, res) => {
    const { name, pronoun, introduction, twitterId} = req.body;
    const userPage = await fs.readFile(path.join(__dirname, 'views', 'user.html'), 'utf8');

    // 데이터 가져오기
    // const renderedUserPage = userPage
    //     .replace('{name}', name)
    //     .replace('{pronoun}', pronoun)
    //     .replace('{introduction}', introduction)
    //     .replace('{twitterID}', twitterId);
    // console.log(renderedUserPage);

    var twitterId2 ;
    //만약 req.body의 twitterID의 값이 빈 문자열이라면 twitterID를 '_'으로 바꿔준다.
    if (twitterId.toString() === '') {
        twitterId2 = "_";
    }else{
        twitterId2 = twitterId.toString();
    }

    res.send(`<link rel="stylesheet" type="text/css" href="https://unpkg.com/mvp.css@1.8.0/mvp.css">
    <p><h2>새 페이지가 생성되었습니다.<a href="${req.baseUrl}/${encodeURIComponent(name)}/${encodeURIComponent(pronoun)}/${encodeURIComponent(introduction)}/${encodeURIComponent(twitterId2)}/">여기에서 확인하세요.</a></h2></p>
    <style> body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh; 
      min-width:min-content;
      margin: 0; } </style>`);});


// 동적 페이지 
app.get('/:name/:pronoun/:introduction/:twitterID/', async (req, res) => {
    const { name, pronoun, introduction, twitterID } = req.params;
    console.log('Received data:', name, pronoun, introduction, twitterID);

    const userPage = await fs.readFile(path.join(__dirname, 'views', 'user.html'), 'utf8');
    const renderedUserPage = userPage
        .replace('{name}', name)
        .replace('{pronoun}', pronoun)
        .replace('{introduction}', introduction)
        .replace('{twitterID}', twitterID);

    res.send(renderedUserPage);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
