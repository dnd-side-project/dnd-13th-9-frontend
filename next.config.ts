import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true, // width/height -> 1em
            svgProps: { width: '1em', height: '1em' },
            replaceAttrValues: {
              '#000': 'currentColor',
              black: 'currentColor',
            },
            svgo: true,
            svgoConfig: {
              plugins: [{ name: 'removeDimensions', active: true }],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
