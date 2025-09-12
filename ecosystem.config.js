module.exports = {
  apps: [
    {
      script: "node_modules/.bin/next",
      args: ["start", "--", "-p", "5000"],
      watch: false,
      env: {
        APP_PORT: 3002,
        NODE_ENV: "production",
      },
      instances: "2",
      autorestart: true,
      name: "mycheckplus-fe",
    },
  ],
};
