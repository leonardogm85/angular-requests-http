const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const connectMultiparty = require('connect-multiparty');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

const multipartyMiddleware = connectMultiparty({
  uploadDir: './uploads'
});

app.post('/upload', multipartyMiddleware, (req, res) => {
  console.log(req.files);
  res.json({
    message: req.files
  });
});

app.get('/download-word', (req, res) => {
  res.download('./uploads/report.docx');
});

app.get('/download-pdf', (req, res) => {
  res.download('./uploads/report.pdf');
});

app.use((err, req, res, next) => {
  res.json({
    error: err.message
  });
});

app.listen(8000, () => {
  console.log('Server port 8000');
});
