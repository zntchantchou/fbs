module.exports = {
  apps: [
    {
      name: "inventor",
      scripts: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        VAR1: "variable",
      },
    },
  ],
};
