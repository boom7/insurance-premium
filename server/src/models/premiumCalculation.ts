import mongoose from 'mongoose';

const premiumCalculationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  genderCd: String,
  dob: String,
  planCode: String,
  premiumPerYear: Number,
  paymentFrequency: String,
  result: Object, // result of the premium calculation
  createdAt: { type: Date, default: Date.now },
});

const PremiumCalculation = mongoose.model('PremiumCalculation', premiumCalculationSchema);

export default PremiumCalculation;
