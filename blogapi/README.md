# 一、前台数据接口

基础路径：http://localhost:3000/home

| 接口功能 |   接口地址   |
| :------: | :----------: |
| 文章列表 |    /index    |
| 文章详情 |   /detail    |
| 评论列表 | /commentlist |
| 发表评论 | /commentpost |
| 用户注册 |   /signup    |
| 用户登录 |   /signin    |



## 1.文章列表

> 访问方式：GET

> 访问路径：/index

>权限：所有人可见

| 参数 | 说明 | 备注 |
| :--: | :--: | :--: |
|  无  |  无  |  /   |

> 请求示例

```json
http://localhost:3000/home/index
```

> 返回信息示例：

```json
[{
    _id:"604c66f46232df9e5ca42f76"
    title:"测试文章",
    author:"测试成员",
    publishDate:"2020-01-01 00:00",
    content:"测试摘要信息"
},{...}
]
```



## 2.文章详情

> 访问方式：POST

> 访问路径：/detail

> 权限：所有人可见

| 参数 |     说明     | 备注 |
| :--: | :----------: | :--: |
|  id  | 对应文章编号 |  /   |

> 请求示例

```json
http://localhost:3000/home/detail
POST内容：
{
    id:'604c66f46232df9e5ca42f76'
}
```

> 返回成功信息示例

```json
{
    _id:'604c66f46232df9e5ca42f76'
    title:"测试文章",
    author:"测试成员",
    publishDate:"2020-01-01 00:00",
    contentOri:"#测试文章\n##测试文章1级标题...",
}
```

> 返回失败信息示例

```json
{
    "type": "error",
    "title": "失败",
    "message": "文章查询失败"
}
```



## 3.评论列表

> 访问方式：POST

> 访问路径：/commentlist

> 权限：所有人可见

| 参数 |     说明     | 备注 |
| :--: | :----------: | :--: |
|  id  | 对应文章编号 |  /   |

> 请求示例

```json
http://localhost:3000/home/
POST内容：
{
    id:'604c66f46232df9e5ca42f76'
}
```

> 返回成功信息示例

```json
[{
   "_id": "606577dd184800000e007bf3",
   "aid": "604c66f46232df9e5ca42f76",
   "uid": "6057098e55a5fc2de05f6d4b",
   "content": "这篇文章内容不错,感谢老铁送来的SQL，这下补考稳了",
   "time": "2020-02-28 09:05:02"
},{...}
]
```

> 返回失败信息示例

```json
{
    "type": "error",
    "title": "失败",
    "message": "评论查询失败"
}
```



## 4.发表评论

> 访问方式：POST

> 访问路径：/commentpost

> 权限：登录用户可见

|  参数   |     说明     |  备注  |
| :-----: | :----------: | :----: |
|   id    | 对应文章编号 | 必填项 |
| content |   评论内容   | 选填项 |
|  token  |   用户识别   | 必填项 |

> 请求示例

```json
http://localhost:3000/home/commentpost
POST内容：
{
  aid: '604c66f46232df9e5ca42f76',
  token: 'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q',
  content: '这是一条4-29测试评论。',
  uid: '6045fc75ca8e853f14c6e595'
}
```

> 返回信息示例

```json
{
    "type": "success",
    "title": "成功",
    "message": "新增一条评论成功"
}
```





## 5.用户注册

> 访问方式：POST

> 访问路径：/signup

> 权限：所有用户可见，前台仅能注册普通用户

|   参数   |   说明   |    备注    |
| :------: | :------: | :--------: |
|  email   |   邮箱   |   必填项   |
| username |  用户名  |   必填项   |
| password |   密码   |   必填项   |
|   role   | 用户角色 | user/admin |

> 请求示例

```json
http://localhost:3000/home/signup
POST内容：
{
  email: '4-29@qq.com',
  username: '4-29测试用户',
  password: '123456',
  role: 'user'
}
```

> 返回信息示例

```json
{
    "type": "success",
    "title": "成功",
    "message": "用户注册成功"
}
```





## 6.用户登录

> 访问方式：POST

> 访问路径：/signin

> 权限：所有用户可见

|   参数   | 说明 |  备注  |
| :------: | :--: | :----: |
|  email   | 邮箱 | 必填项 |
| password | 密码 | 必填项 |

> 请求示例

```json
http://localhost:3000/home/signin
POST内容：
{
  email: '1741352997@qq.com',
  password: '123456'
}
```

> 返回信息示例

```json
{
    "info": {
        "type": "success",
        "title": "成功",
        "message": "用户登录成功"
    },
    "token": "eyJhbGciOiJIUzI1NiJ9.MTIzNDU2.dpfN_VAG8rGA9S54UIxIRzeUWt1iuRhImega6807aYg",
    "username": "666666",
    "uid": "6052d17016525052e087f4d6"
}
```





# 二、后台数据接口

基础路径：http://localhost:3000/admin

| 接口功能 |   接口地址   |
| :------: | :----------: |
| 文章上传 | /articlepost |
| 文章列表 | /articlelist |
| 文章编辑 | /articleedit |
| 文章删除 | /articledrop |
| 用户列表 |  /userlist   |
| 用户编辑 |  /useredit   |
| 用户删除 |  /userdrop   |
| 评论列表 | /commentlist |
| 评论删除 | /commentdrop |
| 用户注册 |   /signup    |
| 用户登录 |   /signin    |



## 1.文章上传

> 访问方式：POST

> 访问路径：/articlepost

>权限：管理员、普通用户

|      参数       |      说明      |  备注  |
| :-------------: | :------------: | :----: |
|      title      |    文章标题    | 必填项 |
|     content     |    文章内容    | 必填项 |
|      token      |    用户识别    | 必填项 |
|   contentOri    | 原始md格式文档 | 必填项 |
| contentAbstract |  文章摘要信息  | 必填项 |
|       uid       |     用户id     | 必填项 |

> 请求示例

```json
http://localhost:3000/admin/articlepost
POST内容：
{
  title: '4-29测试题目',
  token: 'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q',
  contentOri: '# 一级标题\\n ## 二级标题',
  contentAbstract: '<h1>一级标题</h1><h2>二级标题</h2>',
  uid: '6045fc75ca8e853f14c6e595'
}
```

> 返回信息示例：

```json
{
    "type": "success",
    "title": "成功",
    "message": "文章上传成功"
}
```



## 2.文章列表

> 访问方式：POST

> 访问路径：/articlelist

>权限：管理员、普通用户

| 参数  |   说明   |                       备注                       |
| :---: | :------: | :----------------------------------------------: |
| token | 用户识别 | 普通用户仅显示自己文章，普通员显示所有用户的文章 |

> 请求示例

```json
http://localhost:3000/admin/articlepost
POST内容：
{ 
    token:'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q'
}
```

> 普通员返回信息示例：

```json
[
    {
        "publishDate": "2021-04-29 10:39:46",
        "_id": "608a91c87d720000d20025a2",
        "author": "666666",
        "title": "4-29测试题目",
        "content": "一级标题二级标题"
    },{...}，{...},{...}
]
```

> 普通用户返回信息示例

```json
[
    {
        "publishDate": "2021-04-29T02:39:46.093Z",
        "_id": "608a91c87d720000d20025a2",
        "author": "6052d17016525052e087f4d6",
        "title": "4-29测试题目",
        "content": "<h1>一级标题</h1><h2>二级标题</h2>"
    }
]
```



## 3.文章编辑

> 访问方式：POST

> 访问路径：/articleedit

>权限：管理员、普通用户

|      参数       |     说明     |  备注  |
| :-------------: | :----------: | :----: |
|       id        |   文章编号   | 必填项 |
|      title      |   文章标题   | 必填项 |
|     content     |   文章内容   | 必填项 |
|      token      |   用户识别   | 必填项 |
|   contentOri    | 文章原始内容 | 必填项 |
| contentAbstract | 文章摘要内容 | 必填项 |

> 请求示例

```json
http://localhost:3000/admin/articleedit
POST内容：
{
  token: 'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q',
  aid: '604c66f46232df9e5ca42f76',
  title: '4-29测试修改',
  contentOri: '# 一级标题\\n ## 二级标题',
  contentAbstract: '<h1>一级标题</h1><h2>二级标题</h2>',
  uid: '6045fc75ca8e853f14c6e595'
}
```

> 返回信息示例：

```json
{
    "type": "success",
    "title": "成功",
    "message": "文章更新成功"
}
```



## 4.文章删除

> 访问方式：POST

> 访问路径：/articledrop

>权限：管理员、普通用户

| 参数  |   说明   |  备注  |
| :---: | :------: | :----: |
|  id   | 文章编号 | 必填项 |
| token | 用户识别 | 必填项 |
|  uid  |  用户id  | 必填项 |

> 请求示例

```json
http://localhost:3000/admin/articledrop
POST内容：
{
    uid:'6045fc75ca8e853f14c6e595'
	id:'60891e10673bfc4950367198'
    token:'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q'
}
```

> 返回信息示例：

```json
{
    "type": "success",
    "title": "成功",
    "message": "文章删除成功"
}
```



## 5.用户列表

> 访问方式：POST

> 访问路径：/userlist

>权限：管理员

| 参数  |   说明   |                            备注                            |
| :---: | :------: | :--------------------------------------------------------: |
| token | 用户识别 | 管理员可以查看所有用户的信息，普通用户提示无权访问当前页面 |

> 普通员请求示例

```json
http://localhost:3000/admin/userlist
POST内容：
{
    uid:'6045fc75ca8e853f14c6e595',
    token:'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q'
}
```

> 管理员访问返回信息示例：

```json
[
    {
        "state": 0,
        "_id": "6045fc75ca8e853f14c6e595",
        "username": "张三1",
        "email": "1741352997@qq.com",
        "password": "$2b$10$CevMIkqObYn1i5K4/X/NKOeToUo9WyJP/Ss7SvOt9YbtRLEHqABAy",
        "role": "admin",
        "__v": 0
    },{...}
]
```

> 普通用户请求示例：

```json
http://localhost:3000/admin/userlist
POST内容：
{
    uid:'6045fc75ca8e853f14c6e595',
    token:'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q'
}
```

> 普通用户访问返回信息示例：

```json
{
    "type": "error",
    "title": "失败",
    "message": "您无权访问用户列表"
}
```



## 6.用户编辑

> 访问方式：POST

> 访问路径：/useredit

>权限：管理员

|   参数   |   说明   |                           备注                           |
| :------: | :------: | :------------------------------------------------------: |
|  token   | 用户识别 | 管理员可以编辑所有用户的信息，普通用户仅能编辑自己的信息 |
| username |  用户名  |                        修改用户名                        |
| password | 用户密码 |                       修改用户密码                       |
|   role   | 用户权限 |                       管理员可修改                       |
|  state   | 用户状态 |                      是否封禁？1:0                       |

> 请求示例

```json
http://localhost:3000/admin/useredit
POST内容：
{
  token: 'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q',
  uid: '6045fc75ca8e853f14c6e595',
  username: '666666',
  password: '666666',
  role: 'user',
  state: '0',
  editId: '6052d17016525052e087f4d6'
}
```

> 返回信息示例：

```json
{
    "type": "success",
    "title": "成功",
    "message": "用户信息修改成功"
}
```



## 7.评论列表

> 访问方式：POST

> 访问路径：/commentlist

>权限：普通用户、管理员

| 参数  |   说明   |                       备注                       |
| :---: | :------: | :----------------------------------------------: |
| token | 用户识别 | 普通用户仅显示自己评论，普通员显示所有用户的评论 |
|  uid  |  用户名  |                用来识别用户的权限                |

> 管理员请求示例

```json
http://localhost:3000/admin/commentlist
POST内容：
{
    token:'eyJhbGciOiJIUzI1NiJ9.YWVyb211MUBxcS5jb20.IMiiK2_vrVfUqijSDKCFg4iQ96XHIGU1myDBgypwHFs',
    uid:'604f5badce46dd22fc6b266b'
}
```

> 管理员返回信息示例：

```json
[
    {
        "_id": "606577ce184800000e007bf2",
        "aid": "604c66f46232df9e5ca42f76",
        "uid": "604f5badce46dd22fc6b266b",
        "content": "这篇文章的排版不错查询语句语法没有错误的话，并且数据库中不存在符合条件的查询结果，那么就返回了空； 查询语句有语法错误，数据库将会报一个语法错误(synatx error on xx line)，这时候要检查查询语句格式。",
        "time": "2021-03-28T11:05:02.000Z"
    },{...},{...}
]
```

> 普通用户返回信息示例

```json
{
    "_id": "606577ef184800000e007bf4",
    "aid": "604c66f46232df9e5ca42f76",
    "uid": "6045fc75ca8e853f14c6e595",
    "content": "这篇文章内容不错,感谢老铁送来的SQL，这下补考稳 大了....",
    "time": "2019-01-28T11:05:02.000Z"
}
```



## 8.评论删除

> 访问方式：POST

> 访问路径：/commentdrop

>权限：普通用户、管理员

| 参数  |   说明   | 备注 |
| :---: | :------: | :--: |
| token | 用户识别 | 必填 |
|  id   |  评论id  | 必填 |
|  uid  |  用户id  | 必填 |

> 请求示例

```json
http://localhost:3000/admin/commentdrop
POST内容：
{
  token: 'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q',
  uid: '6045fc75ca8e853f14c6e595',
  id: '608a5dfb5ab3b0408c15594a'
}
```

> 返回信息示例：

```json
{
    "type": "success",
    "title": "成功",
    "message": "评论删除成功"
}
```



## 9.管理注册

_管理员可以再次注册管理员用户，而普通登录或未登录用户仅能注册普通用户。_

> 访问方式：POST

> 访问路径：/signup

>权限：普通用户、管理员

|   参数   |     说明     |           备注            |
| :------: | :----------: | :-----------------------: |
|  token   |   用户识别   |           选填            |
|  email   |     邮箱     |           必填            |
| username |    用户名    |           必填            |
| password |     密码     |           必填            |
|   role   |     权限     |           选填            |
|  state   | 注册用户状态 | 默认启用:0/未激活或封禁:1 |

> 普通员请求示例

```json
http://localhost:3000/admin/signup
POST内容：
{
  token: 'eyJhbGciOiJIUzI1NiJ9.MTc0MTM1Mjk5N0BxcS5jb20.yAXLFTn7_mVfydNI-mEWCfYXICaRdyzRiuUO-7jhE3Q',
  uid: '6045fc75ca8e853f14c6e595',
  email: '0430@qq.com',
  password: '123456',
  username: '4-30测试用户',
  role: 'admin',
  state: '0'
}
```

> 普通员返回信息示例：

```json
{
    "type": "success",
    "title": "成功",
    "message": "管理员注册成功"
}
```





# 三、依赖

|   包/框架    |     版本     |
| :----------: | :----------: |
|   Express    |    4.16.4    |
|   Mongoose   |    5.12.6    |
|  dateformat  |    4.5.1     |
| jsonwebtoken |    8.5.1     |
|    bcrypt    |    5.0.1     |
|     joi      |    17.4.0    |
| node-windows | 1.0.0-beta.5 |



