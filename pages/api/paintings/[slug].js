import { toKebabCase } from '../../../utils/formatString';
import addIndex from '../../../utils/addIndex';
import paintings from '../../../data/paintings.json';

export default function handler(req, res) {
  const result = getPainting(req.query.slug);
  res.status(200).json(result);
}

function getPainting(slug) {
  return addIndex(paintings).find((item) => toKebabCase(item.name) === slug);
}
