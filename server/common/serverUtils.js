//返回各种状态字符串
function createResponseData(status, result) {
  var dealStatus;
  switch (status) {
    case 0: dealStatus = 'error'; break;
    case 1: dealStatus = 'success'; break;
    case 2: dealStatus = 'server-error'; break;
    case 3: dealStatus = 'business-error'; break;
    case 4: dealStatus = 'need-login'; break;
    default: dealStatus = status;
  }
  return {
    'status': dealStatus,
    'result': result
  }
}

//生成sessionId
function creatSessionId(length = 20) {
  var chartsArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
  var chartsNum = chartsArr.length;
  var str = '';
  while (length) {
    var randomNum = Math.round(Math.random() * chartsNum);
    str += chartsArr[randomNum];
    length--;
  }
  return str;
}

var serverUtils = {
  createResponseData: createResponseData,
  creatSessionId: creatSessionId
};

module.exports = serverUtils;