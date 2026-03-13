export default function handler(req, res) {
  res.status(200).send(`
    <html>
      <head><title>VivreCard API</title></head>
      <body>
        <h1>VivreCard API marche</h1>
        <p>Bienvenue sur ton dashboard backend</p>
      </body>
    </html>
  `);
}