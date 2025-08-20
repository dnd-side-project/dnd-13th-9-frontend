import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';
import next from 'next/dist/types';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      nextjs: {
        appDirectory: true,
      },
    },
  },
};

export default preview;
