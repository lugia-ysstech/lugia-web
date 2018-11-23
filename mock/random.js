export default {
  '/api/random': function(req, res) {
    res.end(`Math.random: ${Math.random()}`);
  },
};
