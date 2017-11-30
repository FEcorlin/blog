1.AJAX通常是一个异步请求，也就是说，即使componentDidMount函数调用完毕，数据也不会马上就获得，
浏览器会在数据完全到达后才调用AJAX中所设定的回调函数，有时间差。因此当响应数据、更新state前，
需要先通过this.isMounted() 来检测组件的状态是否已经mounted。
2.fetch: 
安装：npm install whatwg-fetch --save; or
    bower install fetch; or
    yarn add whatwg-fetch.
使用：import 'whatwg-fetch'；
HTML
fetch('/users.html')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
  
JSON
fetch('/users.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
  
Response metadata
fetch('/users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'))
  console.log(response.headers.get('Date'))
  console.log(response.status)
  console.log(response.statusText)
})

Post form
var form = document.querySelector('form')
fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})

Post JSON
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})

File upload
var input = document.querySelector('input[type="file"]')
var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')
fetch('/avatars', {
  method: 'POST',
  body: data
});

错误处理：
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
  
发送cookie：
To automatically send cookies for the current domain, the credentials option must be provided:
fetch('/users', {
  credentials: 'same-origin'
})

The "same-origin" value makes fetch behave similarly to XMLHttpRequest with regards to cookies. Otherwise, cookies won't get sent, resulting in these requests not preserving the authentication session.
For CORS requests, use the "include" value to allow sending credentials to other domains:
fetch('https://example.com:1234/users', {
  credentials: 'include'
})


