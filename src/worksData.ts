export interface Work {
  id: string;
  title: string;
  artist: string;
  year: string;
  image: string;
  description: string;
}

export const works: Work[] = [
  {
    id: 'unnamed-space',
    title: 'Unnamed Space',
    artist: 'John Doe',
    year: '2024',
    image: '/images/sample.jpg', // Placeholder
    description:
      'A generative artwork exploring the relationship between light and shadow in a virtual space. The constantly shifting forms create a meditative and ever-evolving environment.',
  },
  {
    id: 'chromatic-pulse',
    title: 'Chromatic Pulse',
    artist: 'Jane Smith',
    year: '2023',
    image: '/images/sample2.jpg', // Placeholder
    description:
      "An interactive installation that responds to the viewer's movement. The colors and patterns are generated in real-time, creating a unique experience for each visitor.",
  },
  {
    id: 'synthetic-nature',
    title: 'Synthetic Nature',
    artist: 'Another Artist',
    year: '2024',
    image: '/images/sample3.jpg', // Placeholder
    description:
      'A series of digital paintings that explore the concept of nature in the age of artificial intelligence. The images are created using a custom-trained generative adversarial network (GAN).',
  },
];
