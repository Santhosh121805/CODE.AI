export const getStats = (req, res) => {
  res.json({
    workflows: 200000,
    models: 100000,
    users: 110000
  });
};
