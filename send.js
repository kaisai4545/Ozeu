
import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send('Error');
    const file = files.file;
    const data = fs.readFileSync(file.filepath);

    await fetch("https://discordapp.com/api/webhooks/1366733661457747989/4B7h-9zJltiz2BH__TSKcBK6y862iK3ym7nu3Exi0OvQveJe4cPYEWt5A6clkGUIRxmq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "胸筋診断画像を受け取りました。",
        files: [{ name: "muscle.jpg", file: data.toString("base64") }]
      })
    });

    res.status(200).json({ success: true });
  });
}
