module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "svg-url-loader",
          options: {
            limit: 10000,
          },
        },
      ],
    });
    // Important: return the modified config
    return config;
  },
  env: {
    HOST: "http://localhost:8000",
  },
};
