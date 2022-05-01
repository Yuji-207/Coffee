import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    var fs = require('fs');
    console.log(fs)
    
    var data = {
        hoge: 100,
        foo: 'a',
        bar: true,
    };
    fs.writeFile('hoge.json', JSON.stringify(data, null, '    '));
    res.status(200).json({ name: 'John Doe' })
  res.status(200).json({ name: 'John Doe' })
}
