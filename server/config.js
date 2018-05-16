var config = {
  port: 7000,                   //服务端口号
  defaultDatabaseName: 'blog',  //mongodb数据库名称
  userDatabaseName: 'user',     //存放用户信息的表名
  cookieSurvivalTime: 1800000   //登录后cookie保存时长
};

module.exports = config;