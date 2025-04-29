const otpMap = new Map();

function generateOTP(phone) {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpMap.set(phone, otp.toString());
  console.log(`Mock SMS to ${phone}: Your OTP is ${otp}`);
  return otp.toString();
}

function verifyOTP(phone, enteredOtp) {
  const validOtp = otpMap.get(phone);
  return validOtp === enteredOtp;
}

module.exports = { generateOTP, verifyOTP };
