function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    const c = exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
    c.stdout.on("data", (data) => {
      console.log(data.substring(0, data.lastIndexOf('\n')))
    })
  });
}

exports.execShellCommand = execShellCommand