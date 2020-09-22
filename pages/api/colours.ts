import { NextApiRequest, NextApiResponse } from 'next'

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    colour: getRandomColor()
  })
}

export default handler
