module.exports = {
  future: {
    webpack5: true,
  },
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
    HOST: "https://iegriez-pasauli.herokuapp.com",
  },
};
