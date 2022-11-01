import addIndex from '@/utils/addIndex';
import paintings from '@/data/paintings.json';

export default function handler(req, res) {
  const result = getPainting(+req.query.id);
  res.status(200).json({ currentPainting: result, total: paintings.length });
}

function getPainting(id) {
  return addIndex(paintings).find((item) => item.id === id);
}
