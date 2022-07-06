import OSS from "ali-oss";
//import UUID4 from 'uuid/v4'

// 下载oss指定地址
export function downloadURL(url) {
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 上传oss
export function ossUpload(picForProject, fileBuffer) {
  let client = new OSS({
    region: "oss-cn-qingdao",
    //secure:true,
    accessKeyId: "STS.NTuUTfAEF1ciFuK33bn6Af3Nx",
    accessKeySecret: "2nkKn6uxvfEVJvax51iMRMSHPfXD3WJWPVJQ7Qkh4jMu",
    stsToken:
      "CAIS8QF1q6Ft5B2yfSjIr5fAHu7SrJpnhqGCRFP61zM3Yrltifblmjz2IH5Oe3ZpAOkXs/0ym2FS6foalqFvSpQASlDBdpOHK2PIA1vzDbDasumZsJYm6vT8a0XxZjf/2MjNGZabKPrWZvaqbX3diyZ32sGUXD6+XlujQ/br4NwdGbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8AGyZQhKwlMn0jsksv/ukpzAu0eB1QLAp7VL99irEP+NdNJxOZpzadCx0dFte7DJuCwqsEYQq/gv1fUVpG6a4YDHXAUJ+XecOu/T6cZzIRRldmWV8mHEeT6WGoABDmKPrnhOljjXKdwtOTZPj8I4K9zdCMS2R0fxm8NPs9qRvjymuZcJle8Gi1u8CnLnOM9BzVrs3oJOCW8AePJGF/49x3Wc/MI/EhbvigjNNS7wN5ryN0gGhatakyd369BnGeYaXwO81Cb74XJ+AONmh5aTATn8srpzwxpl3q8Z0bk=",
    bucket: "guiguoquan-dev",
  });

  const fileName = fileBuffer.name.replace(/-/g, "");
  //const suffix = fileBuffer.name.substr(fileBuffer.name.indexOf('.'))
  const url = `${picForProject}${fileName}`;
  async function put() {
    try {
      const result = await client.put(url, fileBuffer);
      // await xxx(url) 在这里也可以直接把地址传给后端
      return { code: 200, url: result.url };
    } catch (e) {
      return e.message;
    }
  }

  return put();
}

// 分片上传oss picForProject 远程路径 localfile
export function ossMultipartUpload(remotePath, localPath, progress) {
  const client = new OSS({
    region: "oss-cn-qingdao",
    secure:true,
    accessKeyId: "STS.NTuUTfAEF1ciFuK33bn6Af3Nx",
    accessKeySecret: "2nkKn6uxvfEVJvax51iMRMSHPfXD3WJWPVJQ7Qkh4jMu",
    stsToken:
      "CAIS8QF1q6Ft5B2yfSjIr5fAHu7SrJpnhqGCRFP61zM3Yrltifblmjz2IH5Oe3ZpAOkXs/0ym2FS6foalqFvSpQASlDBdpOHK2PIA1vzDbDasumZsJYm6vT8a0XxZjf/2MjNGZabKPrWZvaqbX3diyZ32sGUXD6+XlujQ/br4NwdGbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8AGyZQhKwlMn0jsksv/ukpzAu0eB1QLAp7VL99irEP+NdNJxOZpzadCx0dFte7DJuCwqsEYQq/gv1fUVpG6a4YDHXAUJ+XecOu/T6cZzIRRldmWV8mHEeT6WGoABDmKPrnhOljjXKdwtOTZPj8I4K9zdCMS2R0fxm8NPs9qRvjymuZcJle8Gi1u8CnLnOM9BzVrs3oJOCW8AePJGF/49x3Wc/MI/EhbvigjNNS7wN5ryN0gGhatakyd369BnGeYaXwO81Cb74XJ+AONmh5aTATn8srpzwxpl3q8Z0bk=",
    bucket: "guiguoquan-dev",
  });

  // 开始分片上传。
  async function multipartUpload() {
    try {
      // 依次填写Object完整路径（例如exampledir/exampleobject.txt）和本地文件的完整路径（例如D:\\localpath\\examplefile.txt）。Object完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径（例如examplefile.txt），则默认从示例程序所属项目对应本地路径中上传文件。
      const fileName = localPath.name.replace(/-/g, "");
      const url = `${remotePath}${fileName}`;
      const result = await client.multipartUpload(
        url,
        localPath,
        {
          progress,
          meta: {
            year: 2022,
            people: 'test',
          },
        }
      );
      console.log(result);
    } catch (e) {
      // 捕获超时异常。
      if (e.code === "ConnectionTimeoutError") {
        console.log("TimeoutError");
        // do ConnectionTimeoutError operation
      }
      console.log(e);
      return e.message;
    }
  }

  return multipartUpload();
}

// 获取oss地址
export function showPrivateOss(picName) {
  const client = new OSS({
    region: "oss-cn-qingdao",
    accessKeyId: "STS.NUP4KPjPvHWAhqijmpMeTXUPW",
    accessKeySecret: "ZSi5uPdAoCCYh2D4RdyKYtKo6mjmB4L2sE8c1KVS6Yf",
    stsToken:
      "CAIS9QF1q6Ft5B2yfSjIr5blf/Hkh49X/5WqalfYjm0lQep4t5D7tTz2IH5Oe3ZpAOkXs/0ym2FS6foalqVcZKZ5TEjJa9dc44oPWJlX2nqZ6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsv/nmZbHu0qP0AynlbZKnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwo1vMboG6e74zEXgYAuUraa/C26NRqKxRieqUhB76JAxEzFSi+0BqAAUJPW5dRdoSJc69Xj1Bit/EYuf/4lh09103cETnhDE0Upgmr0QYUUa9MRE8E38kbTcZ8nJDm0L3hz7h9QnYHR23zr6LqCXopX3asmstSPe7FtDcf8ZWe+2YsS3IcHFmsE5kbX8t21BTQF28YojdaueaYKusp8SVC++3mvUvOR6z1",
    bucket: "guiguoquan-dev",
  });

  async function getOssAddr() {
    try {
      let signUrl = client.signatureUrl(picName, { expires: 1800 }); // expires单位为秒
      return { code: 200, url: signUrl };
    } catch (e) {
      return e.message;
    }
  }

  return getOssAddr();
}
// 显示oss地址(拿取oss里面的图片进行显示)
export function imgSig(baseURL) {
  const client = new OSS({
    region: "oss-cn-qingdao",
    accessKeyId: "STS.NUP4KPjPvHWAhqijmpMeTXUPW",
    accessKeySecret: "ZSi5uPdAoCCYh2D4RdyKYtKo6mjmB4L2sE8c1KVS6Yf",
    stsToken:
      "CAIS9QF1q6Ft5B2yfSjIr5blf/Hkh49X/5WqalfYjm0lQep4t5D7tTz2IH5Oe3ZpAOkXs/0ym2FS6foalqVcZKZ5TEjJa9dc44oPWJlX2nqZ6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsv/nmZbHu0qP0AynlbZKnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwo1vMboG6e74zEXgYAuUraa/C26NRqKxRieqUhB76JAxEzFSi+0BqAAUJPW5dRdoSJc69Xj1Bit/EYuf/4lh09103cETnhDE0Upgmr0QYUUa9MRE8E38kbTcZ8nJDm0L3hz7h9QnYHR23zr6LqCXopX3asmstSPe7FtDcf8ZWe+2YsS3IcHFmsE5kbX8t21BTQF28YojdaueaYKusp8SVC++3mvUvOR6z1",
    bucket: "guiguoquan-dev",
  });
  // 生成带图片处理参数的文件签名URL，过期时间10分钟。
  let signUrl = client.signatureUrl(baseURL, {
    expires: 3600,
    process: "image/resize,m_fixed,w_150,h_150/quality,q_100",
  });
  // console.log("signUrl=" + signUrl);
  return signUrl;
  // console.log("signUrl=" + signUrl);
}

// 删除oss
export function deletePrivateOss(picName) {
  //   let bucketName = '';
  //   process.env.NODE_ENV === 'production' ? bucketName = '填你自己申请的' : bucketName = '填你自己申请的';
  let client = new OSS({
    // secure: true, // https
    region: "oss-cn-qingdao",
    accessKeyId: "STS.NUP4KPjPvHWAhqijmpMeTXUPW",
    accessKeySecret: "ZSi5uPdAoCCYh2D4RdyKYtKo6mjmB4L2sE8c1KVS6Yf",
    stsToken:
      "CAIS9QF1q6Ft5B2yfSjIr5blf/Hkh49X/5WqalfYjm0lQep4t5D7tTz2IH5Oe3ZpAOkXs/0ym2FS6foalqVcZKZ5TEjJa9dc44oPWJlX2nqZ6aKP9rUhpMCPOwr6UmzWvqL7Z+H+U6muGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wMDL1VJH7aCwBLH9BLPABvhdYHPH/KT5aXPwXtn3DbATgD2GM+qxsmsv/nmZbHu0qP0AynlbZKnemrfMj4NfsLFYxkTtK40NZxcqf8yyNK43BIjvwo1vMboG6e74zEXgYAuUraa/C26NRqKxRieqUhB76JAxEzFSi+0BqAAUJPW5dRdoSJc69Xj1Bit/EYuf/4lh09103cETnhDE0Upgmr0QYUUa9MRE8E38kbTcZ8nJDm0L3hz7h9QnYHR23zr6LqCXopX3asmstSPe7FtDcf8ZWe+2YsS3IcHFmsE5kbX8t21BTQF28YojdaueaYKusp8SVC++3mvUvOR6z1",
    bucket: "guiguoquan-dev",
  });

  async function deleteOssAddr() {
    try {
      return client.delete(picName);
    } catch (e) {
      return e.message;
    }
  }

  return deleteOssAddr();
}
