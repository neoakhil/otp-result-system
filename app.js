const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const { generateOTP, verifyOTP } = require('./otpStore');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Route to show home page
app.get('/', (req, res) => {
  res.render('home');
});

// Route to handle OTP generation
app.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  generateOTP(phone);  // Mock OTP generation
  res.render('verify', { phone });
});

// Route to verify OTP and display results
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  if (verifyOTP(phone, otp)) {
    try {
      const [rows] = await db.execute('SELECT * FROM students WHERE parent_phone = ?', [phone]);

      if (rows.length > 0) {
        const student = rows[0];
        console.log(`Mock SMS to ${phone}: Your Result - Name: ${student.student_name}, IPE: ${student.ipe_total}/540, EAMCET: ${student.eamcet_marks}/160, Final Score: ${student.final_score.toFixed(2)}, Rank: ${student.rank_position}`);
        res.render('result', { student });
      } else {
        res.send('No student found with this phone number.');
      }
    } catch (error) {
      console.error(error);
      res.send('Database error.');
    }
  } else {
    res.send('Invalid OTP. Please try again.');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
