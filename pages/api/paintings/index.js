import addIndex from '@/utils/addIndex';
import paintings from '@/data/paintings.json';

export default function handler(_, res) {
  const results = addIndex(paintings);
  res.status(200).json({
    paintings: results,
    total: paintings.length,
  });
}
