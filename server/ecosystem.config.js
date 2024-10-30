module.exports = {
  apps: [
    {
      name: "inventor",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        VAR1: "variable",
      },
    },
  ],
};
