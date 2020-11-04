const { writeJSON,  readJson } = require('fs-extra');
const filePath = './package.json';

async function changeVersion() {
  console.info('--- 检测版本 ---');

  try {
    const packageObj = await readJson(filePath);
    const currentVersion = packageObj.version;
    const newVersion = getNewVersion(currentVersion);
    packageObj.version = newVersion;
    console.info('--- 写入新版本 ---：', newVersion, '当前版本', currentVersion);
    try {
      await writeJSON(filePath, packageObj);
      console.log('--- 版本修改成功! ---');
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}

function getNewVersion(version) {
  let newVersion = '1.0.0';
  if (!version) {
    return newVersion;
  }
  const filterResult = version.match(/\.\d+$/g);
  if (filterResult) {
    const filterVersion = filterResult[0];
    if (filterVersion) {
      const currentVersion = Number(filterVersion.replace(/\./g, ''));
      const newVersionNumber = currentVersion + 1;
      newVersion = version.replace(/\.\d+$/g, `.${newVersionNumber}`);
    }
  }
  return newVersion;
}

changeVersion();
