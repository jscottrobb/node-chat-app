
var generateMessage = (from, text) => {
  console.log(`from: ${from}, text: ${text}`);
  
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage};
