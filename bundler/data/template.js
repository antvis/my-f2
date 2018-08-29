module.exports = blocks => `
const myF2 = require('./core');
${blocks}
module.exports = myF2;
`;
