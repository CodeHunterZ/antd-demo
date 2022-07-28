import enquireJs from "enquire.js";

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
if (!Date.prototype.Format) {
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}

//为url字符串添加、修改参数
String.prototype.EditUrlParam = function (paramName, replaceWith) {
  var url = this;
  if (url.indexOf(paramName) > -1) {
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    url = url.replace(re, paramName + '=' + replaceWith);
  } else {
    var paraStr = paramName + '=' + replaceWith;

    var idx = url.indexOf('?');
    if (idx < 0)
      url += '?';
    else if (idx >= 0 && idx != url.length - 1)
      url += '&';
    url = url + paraStr;
  }
  return url;
};

export function isDef(v) {
  return v !== undefined && v !== null;
}

/**
 * Remove an item from an array.
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

export function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}

export function enquireScreen(call) {
  const handler = {
    match: function () {
      call && call(true);
    },
    unmatch: function () {
      call && call(false);
    },
  };
  enquireJs.register("only screen and (max-width: 767.99px)", handler);
}

/**
 * 根据字符串属性(类似:xx.yy.zz)获取对象中的值
 * let res = getField(json,'body.data.data');  //res === [1,2,3]
 * let value = getField(json,'body.request.data');//value === undefined
 * let resType = getField(json,'body.data.data',true); //resType==='Array'
 * let isType = getField(json,'body.data.data','Array');//isType===true
 * @param {*} data 原始对象
 * @param {*} fields 类似 xx.yy.zz
 * @param {*} pattern
 */
export function getField(data, fields, pattern) {
  let arr = fields.split(".");
  let key = arr.shift();
  let value = data[key];

  if (value == null) {
    return value;
  } else if (arr.length == 0) {
    if (!pattern) return value;
    let type = Object.prototype.toString
      .call(value)
      .replace("[object ", "")
      .replace("]", "");
    if (pattern === true) {
      return type;
    } else if (!pattern) {
      return value;
    } else {
      return type == pattern;
    }
  }
  let result = getField(value, arr.join("."), pattern);
  return result;
}

export const validRules = {
  /*
   * 验证必须是正整数(不包含0)
   * */
  gt0int: (rule, value, callback) => {
    const reg = /^[1-9]*[1-9][0-9]*$/;
    if (value) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    } else {
      callback();
    }
  },
  /*
   * 是否是数字(包含字符类型的数字)
   * */
  isNumber: (rule, value, callback) => {
    if (value === "" || value == null) {
      callback();
    }
    if (!isNaN(value)) {
      //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
      //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
      callback();
    } else {
      callback(new Error(rule.message));
    }
  },
  //比较年龄（配合验证数字方法使用）
  compare2age: (start, end, fixedtime) => {
    return function (rule, value, callback) {
      if (fixedtime) {
        callback();
      } else {
        if (start && end) {
          var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
          if (reg.test(start) && reg.test(end)) {
            if (
              parseFloat(start) < parseFloat(end) ||
              parseFloat(start) == parseFloat(end)
            ) {
              callback();
            } else {
              return callback("请输入从小到大的数字");
            }
          } else { callback(); }
        }
        else { callback(); }
      }
    };
  },
  //比较两个月份的大小
  bjDate: (date, date1) => {
    return function (rule, value, callback) {
      if (date && date1) {
        const d1 = new Date(date + '-01:00:00:00');
        const d2 = new Date(date1 + '-01:00:00:00');
        console.log(d1.getTime() - d2.getTime())
        if (d1.getTime() - d2.getTime() > 0) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
      else { callback(); }
    }
  },
  //验证手机号
  mobile: (rule, value, callback) => {
    value = value ? value.trim() : "";
    var reg = /^(1\d{10})$/;
    if (reg.test(value) || value == "") {
      callback();
    }
    callback(new Error(rule.message));
  },
  //验证邮箱
  email: (rule, value, callback) => {
    value = value ? value.trim() : "";
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (reg.test(value) || value == "") {
      callback();
    }
    callback(new Error(rule.message));
  },
  //验证最小值6
  min6: (rule, value, callback) => {
    if (value == null || value == "") {
      callback();
    }
    if (value.length >= 6) {
      callback();
    } else {
      callback(new Error(rule.message));
    }
  },
  //6~16位字母数字组合密码
  checkPassword: (rule, value, callback) => {
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if (value == null || value == "" || reg.test(value)) {
      callback();
    } else {
      callback(new Error(rule.message));
    }
  },
  //验证最小长度 适用字符串,数组
  minlen: (rule, value, callback) => {
    value = value instanceof Array ? value : value.trim(); //判断是否数组
    if (value.length >= rule.minlength) {
      callback();
    }
    callback(new Error(rule.message));
  },
  idCard: (rule, value, callback) => {
    // 如果为空值，就抛出错误
    if (!value) {
      callback();
    } else {
      if (!/(^\d{18}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    }
  },
  //开始时间和结束时间必填
  checkMeetTime: (time1, time2) => {
    return function (rule, value, callback) {
      if (time1 && time2) {
        callback();
      }
      else { callback(new Error(rule.message)); }
    }
  },
  //选择会议形式，第一个字段为online时，第二个字段必填
  checkMeetType: (type1, type2) => {
    return function (rule, value, callback) {
      if (type1 == 'online') {
        if (type2) {
          callback();
        }
        else {
          callback(new Error(rule.message));
        }
      }
      else {
        callback();
      }
    }
  },
};

/**
 * 深度克隆
 * @param {*} data 原始对象
 * @param {*} hash
 * @returns
 */
export function deepCopy(data, hash = new WeakMap()) {
  if (typeof data !== "object" || data === null) {
    throw new TypeError("传入参数不是对象");
  }
  // 判断传入的待拷贝对象的引用是否存在于hash中
  if (hash.has(data)) {
    return hash.get(data);
  }
  let newData = {};
  const dataKeys = Object.keys(data);
  dataKeys.forEach((value) => {
    const currentDataValue = data[value];
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== "object" || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue]);
    } else {
      // 将这个待拷贝对象的引用存于hash中
      hash.set(data, data);
      // 普通对象则递归赋值
      newData[value] = deepCopy(currentDataValue, hash);
    }
  });
  return newData;
}

/*
 * 以原对象字段进行对象复制
 * obj.source
 * obj.data
 * */
export function sourceClone(obj) {
  var resObj = {};
  for (var key in obj.source) {
    resObj[key] = obj.data[key];
  }
  return resObj;
}
/*
 * 清空对象所有值
 * obj
 * */
export function clearObj(obj) {
  Object.keys(obj).forEach((key) => (obj[key] = ""));
  return obj;
}


/**
 * 验证文件格式
 */
export function validFileSuffix(file, config = []) {
  let res = true;
  // 文件类型
  // const fileList = {
  //   pdf: {
  //     suffix: "pdf",
  //     type: "application/pdf"
  //   },
  //   doc: {
  //     suffix: "doc",
  //     type: "application/msword"
  //   },
  //   docx: {
  //     suffix: "docx",
  //     type:
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //   },
  //   xls: {
  //     suffix: "xls",
  //     type: "application/vnd.ms-excel"
  //   },
  //   xlsx: {
  //     suffix: "xlsx",
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   },
  //   jpg: {
  //     suffix: "jpg",
  //     type: "image/jpeg"
  //   },
  //   png: {
  //     suffix: "png",
  //     type: "image/png"
  //   }
  // };
  let fileSuffix = file.name
    .substring(file.name.lastIndexOf(".") + 1)
    .toLowerCase();

  res = config.indexOf(fileSuffix) >= 0;

  return res;
}

/**
 *
 * @param {*} file 文件对象
 * @param {*} suffix 要验证的后缀
 * @param {*} size 文件大小
 */
export function validFile(file, suffix = [], size = 10) {
  let fileSuffix = file.name
    .substring(file.name.lastIndexOf(".") + 1)
    .toLowerCase();
  let fileSize = file.size / 1024 / 1024; //计算文件大小(M)
  let suffixRes = suffix.indexOf(fileSuffix) >= 0;
  let sizeRes = fileSize < size;
  return { suffix: suffixRes, size: sizeRes };
}

/**
 * 生成上传控件的 accept
 * @param {*} config
 */
export function buildFileAccept(config = []) {
  let resArr = [];
  // 文件类型
  const configList = {
    pdf: {
      suffix: "pdf",
      type: "application/pdf"
    },
    doc: {
      suffix: "doc",
      type: "application/msword"
    },
    docx: {
      suffix: "docx",
      type:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    xls: {
      suffix: "xls",
      type: "application/vnd.ms-excel"
    },
    xlsx: {
      suffix: "xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    jpg: {
      suffix: "jpg",
      type: "image/jpeg"
    },
    png: {
      suffix: "png",
      type: "image/png"
    }
  };
  config.forEach(item => {
    if (configList[item]) {
      resArr.push(configList[item]["type"]);
    }
  });
  return resArr.join(",");
}

/**
 * 生成随机字符串
 * @param {Number} length 生成的长度
 * @returns 随机字符串
 */
export function randomString(length) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

/**
 * 从树形json中,根据子节点的value查找所有父节点
 * @param {*} array 所有数据
 * @param {*} value 子节点value
 * @param {*} valueKey 数据中节点value的key
 * @param {*} childrenKey 数据中节点children的key
 * @returns
 */
export function findPatentValue(
  array,
  value,
  valueKey = "id",
  childrenKey = "children"
) {
  if (!value || !Array.isArray(array)) return [];
  const result = [];
  let valid = false;
  const seek = (array, value) => {
    let parentValue = "";
    const up = (array, value, lastValue) => {
      array.forEach((item) => {
        const val = item[valueKey];
        const childList = item[childrenKey];
        if (val === value) {
          valid = true;
          parentValue = lastValue;
          return;
        }
        if (childList && childList.length) up(childList, value, val);
      });
    };
    up(array, value);
    if (parentValue) {
      result.unshift(parentValue);
      seek(array, parentValue);
    }
  };
  seek(array, value);

  return valid ? [...result, value] : [];
}

/**
 * res 异步返回的res
 * params.errToast Bool 是否吐司.
 * params.showSucTip: true,
 * params.showErrTip: true,
 * params.doSucFuncNow: false,
 * params.doErrFuncNow: false,
 */
export function handleRes(res, params) {
  let defParams = {
    sucCb: null,
    errCb: null,
    showSucTip: true,
    showErrTip: true,
    doSucFuncNow: false,
    doErrFuncNow: false,
    duration: 1500
  }
  let settings = Object.assign({}, defParams, params)
  if (res.status === 200) {
    if (res.data.status === 'succeed') {
      if (settings.showSucTip) {
        window["$$message"].success({
          content: res.data.msg,
          duration: settings.duration,
          onClose() {
            res.sucCb && res.sucCb(res.data);
          }
        });
      }
      else {
        settings.sucCb && settings.sucCb(res.data);
      }
    }
    else if (res.data.status === 'fail') {
      if (settings.showErrTip) {
        window["$$message"].error({
          content: res.data.msg,
          duration: settings.duration,
          onClose() {
            res.errCb && res.errCb(res.data);
          }
        });
      }
      else {
        res.errCb && res.errCb(res.data);
      }
    }
  }
  else if (res.status === 500) {
    window["$$message"].error({ content: "网络错误" });
  }
  else {
    window["$$message"].error({ content: res.status + "错误" });
  }
}

/*
 * 删除数组中某一项
 * */
if (!Array.prototype.remove) {
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
}
/*
 * 数组添加数据,如果重复不添加
 * */
if (!Array.prototype.pushSole) {
  Array.prototype.pushSole = function (val) {
    var index = this.indexOf(val);
    if (index <= -1) {
      this.push(val);
    }
  };
}
/**
 * 根据数组某个属性进行分组，最终会返回一个map对象
 * @array 原数组
 * @f 函数，根据该函数的返回结果，来决定要把这个对象分到哪一组中
 */
export function groupBy(array, f) {
  // 初始化map，用来存储键值对
  let map = new Map();
  array.forEach((obj) => {
    // 根据传入的函数，对数组中每个对象产生一个key值，并将key值相等的对象分成一组
    let key = f(obj)
    map.set(key, (map.get(key) || []))
    map.get(key).push(obj)
  })
  return map
}
/*判断对象(json)是否为空*/
export function isEmptyObject(obj) {
  let name;
  for (name in obj) {
    return false;
  }
  return true;
}
/*
     * 检测对象是否是空对象(不包含任何可读属性)。
     * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
     */
/*
* 判断变量是否为空(空对象,空数组,空字符串,null,undefined,0)
* 空返回true
* */
export function isEmpty(val) {
  var type = Object.prototype.toString.call(val);
  // 数组
  if (type === "[object Array]") {
    return !val.length;
  }
  //对象判断
  if (type === "[object Object]") {
    return isEmptyObject(val);
  }
  //null undefined
  if (type === "[object Undefined]" || type === "[object Null]") {
    return true;
  }

  return !val;
}
/*获取1950-至今的年份*/
export function getYearList() {
  let myDate = new Date();
  let thisYear = myDate.getFullYear();
  let arrYear = [];
  for (let i = 1950; i <= thisYear; i++) {
    arrYear.push({ value: i, name: i })
  }
  return arrYear;
}
/*通用字符串替换*/
export function utilReplace(str) {
  str = str.replace(/\r\n/g, "<br>")
  str = str.replace(/\n/g, "<br>");
  str = str.replace(/(\r\n)|(\n)/g, '<br>');
  return str;
}
const _toString = Object.prototype.toString;

/**
 * 取出对象中部分属性组成一个新对象
 */
export function buildPartObj(obj, arr) {
  obj = JSON.parse(JSON.stringify(obj));
  const newObj = {}
  arr.forEach(key => {
    newObj[key] = obj[key]
  })
  return newObj;
}


// // url追加token
// export function urlWithToken(url) {
//   const token = Cookie.get("access_token");
//   url = url.EditUrlParam("access_token", token);
//   // let res = appendQuery(url, "access_token", token);
//   return url;
// }

export function urlWithToken(url) {
  const token = "";
  url = url.EditUrlParam("access_token", token);
  // let res = appendQuery(url, "access_token", token);
  return url;
}

/**
 * @param {string} sourceName 源文件名
 * return 生成上传oss路径+文件名(带 .后缀)
 */
export function buildOssPath(sourceName) {
  let suffix = "";

  let suffixArr = sourceName.split(".");
  if (suffixArr.length === 1) {
    suffix = "";
  } else {
    suffix = "." + suffixArr[suffixArr.length - 1];
  }
  // let nowDate = new Date();
  let path = suffix;
  return path;
}

/**
***获取两个日期间的所有日期
***默认start<end
**/
export function getDiffDate(start, end) {
  var startTime = getDate(start);
  var endTime = getDate(end);
  var dateArr = [];
  while ((endTime.getTime() - startTime.getTime()) >= 0) {
    var year = startTime.getFullYear();
    var month = (startTime.getMonth() + 1).toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
    var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
    dateArr.push(year + "-" + month + "-" + day);
    startTime.setDate(startTime.getDate() + 1);
  }
  return dateArr;
}
/**
 **datestr:形如‘2017-06-12’的字符串
**return Date 对象
 **/
export function getDate(datestr) {
  var temp = datestr.split("-");
  if (temp[1] === '01') {
    temp[0] = parseInt(temp[0], 10) - 1;
    temp[1] = '12';
  } else {
    temp[1] = parseInt(temp[1], 10) - 1;
  }
  //new Date()的月份入参实际都是当前值-1
  var date = new Date(temp[0], temp[1], temp[2]);
  return date;
}

/**
 * 获取2个时间差
 * @param {*} strDateStart 
 * @param {*} strDateEnd 
 * @returns 
 */
export function getDaysDiff(strDateStart, strDateEnd) {
  var strSeparator = "-";
  //日期分隔符   
  var oDate1; var oDate2;
  var iDays;
  oDate1 = strDateStart.split(strSeparator);
  oDate2 = strDateEnd.split(strSeparator);
  var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
  var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
  iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)
  //把相差的毫秒数转换为天数   
  return iDays;
}

/**
 * 计算start前后多少天是几号
 * @param {*} start 
 * @param {*} num 
 */
export function countDate(start, num) {
  let str = start.replace(/-/g, '/');
  let curr = new Date(str).getTime();
  let resNum = curr + (num * 24 * 60 * 60 * 1000);
  let res = new Date(resNum).Format("yyyy-MM-dd");
  return res;
}

/**
 * 获取对象数组中特定key的value数组
 * @param {*} array 
 * @param {*} keyName 
 * @returns 
 */
export function getArrayValueByKey(array, keyName) {
  if (Object.prototype.toString.call(array) == '[object Array]') {
    return array.map((item) => {
      return item[keyName]
    })
  }
  return 'null（参数一应为对象数组）';//不是数组
}

/**
 * 判断2个数组是否有交集
 * @param {*} arr1 
 * @param {*} arr2 
 */
export function isArrJiaoji(arr1, arr2) {
  let res = false;
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    res = (arr1.length + arr2.length) !== Array.from(new Set([...arr1, ...arr2])).length;
  }

  return res;
}

// const animals=[{name:'dog',sound:'汪汪'},{name:'pig',sound:'哼哼'},{name:'cat',sound:'喵喵'}]

// console.log(getMappingValueArrayOfKey(animals,'name'));//["dog", "pig", "cat"]
// console.log(getMappingValueArrayOfKey(animals,'sound'));//["汪汪", "哼哼", "喵喵"]

