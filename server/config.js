var config = {
  port: 7000,                   //服务端口号
  defaultDatabaseName: 'blog',  //mongodb数据库名称
  userDatabaseName: 'user',     //存放用户信息的表名
  cookieFormName: 'cookie',     //存放session对应用户的表名
  cookieSurvivalTime: 1800000,  //登录后cookie保存时长
  defaultUserGroup: 1,          //新建账号时的默认分组
};

module.exports = config;