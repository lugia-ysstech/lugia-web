export async function dropFileReader(event) {
  if (!event.dataTransfer) {
    return [];
  }
  const fileItems = event.dataTransfer.items;
  if (!fileItems) {
    return event.dataTransfer.files;
  }

  let selectFileList = [];

  for (const item of fileItems) {
    const itemFile = item.webkitGetAsEntry();
    const { isFile } = itemFile;
    if (!isFile) {
      selectFileList.push(itemFile);
    }
  }

  const allFileList = await getDirectoryFiles(selectFileList);
  selectFileList = allFileList.flat(Infinity);

  const fileList = [];

  for (const fileItem of selectFileList) {
    const fileData = await transferToFile(fileItem);
    fileList.push(fileData);
  }

  return fileList;
}

async function getDirectoryFiles(allDirectory) {
  const fileList = [];
  for (const directory of allDirectory) {
    if (directory.isDirectory) {
      const result = await readDirectoryFiles(directory);
      const files = await getDirectoryFiles(result);
      fileList.push(files);
    } else {
      fileList.push(directory);
    }
  }

  return fileList;
}

function readDirectoryFiles(directory) {
  return new Promise((resolve, reject) => {
    const dirReader = directory.createReader();
    let entries = [];

    const getEntries = function() {
      dirReader.readEntries(
        function(results) {
          if (results.length) {
            entries = entries.concat(results);
            getEntries();
          } else {
            resolve(entries);
          }
        },
        function(error) {
          reject(error);
        }
      );
    };

    getEntries();
  });
}

function transferToFile(fileEntry) {
  return new Promise((resolve, reject) => {
    fileEntry.file(
      fileData => {
        fileData.fullPath = fileEntry.fullPath.replace(/^\//g, '');
        resolve(fileData);
      },
      error => {
        reject(error);
      }
    );
  });
}
