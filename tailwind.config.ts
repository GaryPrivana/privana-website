import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        base: {
          50: '#f6f6f5',
          100: '#ececea',
          900: '#121212'
        },
        accent: {
          gold: '#b89a6b',
          slate: '#26303b'
        }
      },
      boxShadow: {
        premium: '0 12px 45px rgba(13, 15, 19, 0.14)'
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at 20% 10%, rgba(184,154,107,0.2), transparent 30%), radial-gradient(circle at 80% 20%, rgba(82,112,143,0.2), transparent 40%)'
      }
    }
  },
  plugins: []
} satisfies Config;
