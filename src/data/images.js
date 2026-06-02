import filenames from 'virtual:wallpapers';

const IMAGES = filenames.map((filename, index, array) => ({
  id: index + 1,
  src: `${import.meta.env.BASE_URL}assets/wallpaper/${filename}`,
  title: filename.replace(/\.(jpg|jpeg|png|webp)$/i, ''),
  label: `${String(index + 1).padStart(2, '0')} / ${String(array.length).padStart(2, '0')}`,
}));

export default IMAGES;
