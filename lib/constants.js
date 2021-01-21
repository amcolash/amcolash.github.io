export const EXAMPLE_PATH = 'blog-starter';
export const CMS_NAME = 'Markdown';
export const HOME_OG_IMAGE_URL =
  'https://og-image.now.sh/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg';

export const Colors = {
  Black: '#222',
  White: '#eee',
  Green: '#48c77f',
};

export const OuterPadding = '1.5rem';

export const interactiveStyle = {
  background: Colors.White,
  border: `2px solid ${Colors.Black}`,
  padding: '0.35rem',
  borderRadius: '0.35rem',
  cursor: 'pointer',

  $nest: {
    '&:hover': {
      background: `${Colors.Green}`,
    },
  },
};
