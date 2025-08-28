import { defineConfig } from 'twind';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

export const config = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    extend: {
      colors: {
        'angular-start': '#dd0330',
        'angular-middle': '#e91e63',
        'angular-end': '#8e24aa',
      },
    },
  },
});
