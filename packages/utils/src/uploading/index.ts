class FileUploaderDownloader {
  // 文件上传方法
  uploadFile(file, progressCallback, completionCallback) {
    // 实现文件上传逻辑
    // 使用XMLHttpRequest或Fetch API发送文件数据到服务器
    // 监听上传进度并调用progressCallback
    // 上传完成后调用completionCallback
  }

  // 文件下载方法
  downloadFile(fileUrl, completionCallback) {
    // 实现文件下载逻辑
    // 使用XHR请求获取文件数据
    // 将文件数据提供给用户进行下载
    // 下载完成后调用completionCallback
  }

  // 分片上传方法
  uploadFileInChunks(file, chunkSize, progressCallback, completionCallback) {
    // 实现分片上传逻辑
    // 将文件分割成多个小块
    // 逐个上传小块到服务器，并监听上传进度并调用progressCallback
    // 服务器端进行小块的合并
    // 上传完成后调用completionCallback
  }

  // 文件夹上传方法
  uploadFolder(folder, progressCallback, completionCallback) {
    // 实现文件夹上传逻辑
    // 遍历文件夹内的所有文件和子文件夹
    // 递归调用文件上传方法进行上传
    // 监听上传进度并调用progressCallback
    // 上传完成后调用completionCallback
  }
}

// 文件上传方法（支持断点续传）
function uploadFile(file, progressCallback, completionCallback, errorCallback) {
  const chunkSize = 1024 * 1024; // 每个分片的大小（1MB）
  const totalChunks = Math.ceil(file.size / chunkSize); // 分片总数
  let uploadedChunks = 0; // 已上传的分片数

  // 上传已上传的分片（断点续传）
  const uploadUploadedChunks = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedChunks', uploadedChunks);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload-url');

    // 监听上传进度
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        progressCallback(progress);
      }
    });

    // 处理上传错误
    xhr.onerror = () => {
      errorCallback('上传发生错误');
    };

    // 处理上传完成
    xhr.onload = () => {
      if (xhr.status === 200) {
        // 上传成功后，继续上传下一个分片或完成上传
        if (uploadedChunks < totalChunks - 1) {
          uploadedChunks++;
          uploadUploadedChunks();
        } else {
          completionCallback();
        }
      } else {
        errorCallback('上传失败');
      }
    };

    // 发送已上传的分片到服务器
    xhr.send(formData);
  };

  // 开始上传
  uploadUploadedChunks();
}

const uploading = (url:string, file, options = { chunked: false }) => {
  let xhr;
  let isPaused = false;

  const start = () => {
    if (options.chunked) {
      startChunkedUpload();
    } else {
      startSingleUpload();
    }
  };

  const startChunkedUpload = () => {
    // 分片上传逻辑
    const chunkSize = 1024 * 1024; // 每个分片的大小（1MB）
    const totalChunks = Math.ceil(file.size / chunkSize); // 分片总数
    let uploadedChunks = 0; // 已上传的分片数

    const uploadChunk = (chunk) => {
      const formData = new FormData();
      formData.append('file', chunk);

      xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      // 监听上传进度
      xhr.upload.addEventListener('progress', onProgress);

      // 处理上传错误
      xhr.onerror = onerror;

      // 处理上传完成
      xhr.onload = () => {
        uploadedChunks++;
        if (uploadedChunks < totalChunks && !isPaused) {
          const startByte = uploadedChunks * chunkSize;
          const endByte = Math.min(startByte + chunkSize, file.size);
          const nextChunk = file.slice(startByte, endByte);
          uploadChunk(nextChunk);
        } else {
          onFinished();
        }
      };

      // 发送分片到服务器
      xhr.send(formData);
    };

    const startByte = 0;
    const endByte = Math.min(chunkSize, file.size);
    const firstChunk = file.slice(startByte, endByte);
    uploadChunk(firstChunk);
  };

  const startSingleUpload = () => {
    // 单文件上传逻辑
    const formData = new FormData();
    formData.append('file', file);

    xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    // 监听上传进度
    xhr.upload.addEventListener('progress', onProgress);

    // 处理上传错误
    xhr.onerror = onerror;

    // 处理上传完成
    xhr.onload = onFinished;

    // 发送文件到服务器
    xhr.send(formData);
  };

  const pause = () => {
    if (xhr && xhr.readyState !== XMLHttpRequest.DONE) {
      xhr.abort();
      isPaused = true;
    }
  };

  const onerror = () => {
    console.log('上传发生错误');
  };

  const onFinished = () => {
    if (!isPaused) {
      console.log('文件上传完成');
    } else {
      console.log('文件上传已暂停');
    }
  };

  const onProgress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      console.log(`上传进度：${progress}%`);
    }
  };

  return {
    start,
    pause,
    onerror,
    onFinished
  };
};

// // 使用示例
// const file = document.getElementById('file-input').files[0];
// const options = { chunked: true }; // 设置为 true 表示进行分片上传
// const upload = uploading('upload-url', file, options);

// // 启动上传
// upload.start();

// // 暂停上传
// // upload.pause();

// // 错误处理
// upload.onerror = () => {
//   console.log('上传发生错误');
// };

// // 完成处理
// upload.onFinished = () => {
//   console.log('文件上传完成');
// };
const uploading_ = (url:string, file:string, options = { chunked: false,chunkSize:0 }) => {
  let xhr:XMLHttpRequest;
  let isPaused = false;
  const chunkSize = 1024 * 1024;
  const start = () => {
    if (options.chunked) {
      startUpload(true);
    } else {
      startUpload(false);
    }
  };

  const startUpload = (isChunked:boolean) => {
    xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    // 监听上传进度
    xhr.upload.addEventListener('progress', onProgress);

    // 处理上传错误
    xhr.onerror = onerror;

    // 处理上传完成
    xhr.onload = () => {
      if (isChunked && !isPaused) {
        const response = JSON.parse(xhr.responseText);
        if (response.nextChunkExists) {
          const nextChunk = file.slice(response.startByte, response.endByte);
          uploadChunk(nextChunk);
        } else {
          onFinished();
        }
      } else {
        onFinished();
      }
    };

    if (isChunked) {
      uploadChunk(file.slice(0, chunkSize));
    } else {
      const formData = new FormData();
      formData.append('file', file);
      xhr.send(formData);
    }
  };

  const uploadChunk = (chunk) => {
    const formData = new FormData();
    formData.append('chunk', chunk);

    xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    // 监听上传进度
    xhr.upload.addEventListener('progress', onProgress);

    // 处理上传错误
    xhr.onerror = onerror;

    // 处理上传完成
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (response.nextChunkExists) {
        const nextChunk = file.slice(response.startByte, response.endByte);
        uploadChunk(nextChunk);
      } else {
        onFinished();
      }
    };

    // 发送分片到服务器
    xhr.send(formData);
  };

  const pause = () => {
    if (xhr && xhr.readyState !== XMLHttpRequest.DONE) {
      xhr.abort();
      isPaused = true;
    }
  };

  const onerror = () => {
    console.log('上传发生错误');
  };

  const onFinished = () => {
    if (!isPaused) {
      console.log('文件上传完成');
    } else {
      console.log('文件上传已暂停');
    }
  };

  const onProgress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      console.log(`上传进度：${progress}%`);
    }
  };

  return {
    start,
    pause,
    onerror,
    onFinished
  };
};

// // 使用示例
// const file = document.getElementById('file-input').files[0];
// const options = { chunked: true }; // 设置为 true 表示进行分片上传
// const upload = uploading('upload-url', file, options);

// // 启动上传
// upload.start();

// // 暂停上传
// // upload.pause();

// // 错误处理
// upload.onerror = () => {
//   console.log('上传发生错误');
// };

// // 完成处理
// upload.onFinished = () => {
//   console.log('文件上传完成');
// };
