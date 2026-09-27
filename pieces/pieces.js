/* The work, newest first. Drop the file into /pieces/ and add a line here.

   src    file name, relative to /pieces/. Image or video (.mp4 / .webm).
   w, h   pixel size. Optional, but without it the grid jumps as things load.
   title  what it is.
   meta   who it was for, and when.
   poster video only, optional: a still to show before it plays.
   link   optional. Wraps the piece so clicking opens the release, not the viewer.

   Example:
   { src: 'love-you.webp', w: 1080, h: 1350,
     title: 'Love You', meta: 'Wolfmanwoof — cover, 2025' },
   { src: 'swell.mp4', w: 1080, h: 1920, poster: 'swell.webp',
     title: 'Swell', meta: 'Audiospatials — motion, 2025' },
*/

const PIECES = [
    { src: 'wolfmanwoof-header.webp', w: 5320, h: 2280,
      title: 'WOLFMANWOOF', meta: 'Header' },
    { src: 'working-title.webp', w: 3000, h: 3000,
      title: 'Working Title', meta: '' },
    { src: 'shifter.webp', w: 3000, h: 3000,
      title: 'Shifter', meta: 'Gregor Egan' },
    { src: 'latency.webp', w: 3000, h: 3000,
      title: 'Latency', meta: '' },
    { src: 'highwater.webp', w: 3000, h: 3000,
      title: 'Highwater', meta: 'Wolfmanwoof — album art' },
    { src: 'triangles.webp', w: 3000, h: 3000,
      title: 'Triangles', meta: '' },
    { src: 'moonrise.webp', w: 3000, h: 3000,
      title: 'Moonrise', meta: '' },
    { src: 'love-you.webp', w: 4000, h: 4000,
      title: 'Love You', meta: 'Wolfmanwoof' },
    { src: 'medium.webp', w: 3000, h: 3000,
      title: 'Medium', meta: '' },
];
