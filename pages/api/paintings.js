import paintings from '../../data/paintings.json';

export default function handler(_, res) {
  res.status(200).send(paintings);
}
