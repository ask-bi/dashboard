const rp = require('request-promise');
const { NLU_SERVICE } = process.env;


exports.getIntent = async (command, json) => {
  let intent = {};
  try {
    intent = await rp(`${NLU_SERVICE}/command-to-json?command=${command}`, { json });
  } catch (e) {
    console.log(e);
    return undefined;
  }
  return intent;
};
