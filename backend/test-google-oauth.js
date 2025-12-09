import dotenv from 'dotenv';

dotenv.config();

console.log('\n🔍 Google OAuth Configuration Check\n');
console.log('=====================================\n');

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

if (clientId && clientId !== 'your-google-client-id-here.apps.googleusercontent.com') {
  console.log('✅ GOOGLE_CLIENT_ID is set');
  console.log(`   ${clientId}\n`);
} else {
  console.log('❌ GOOGLE_CLIENT_ID is not set or using placeholder\n');
}

if (clientSecret && clientSecret !== 'your-google-client-secret-here') {
  console.log('✅ GOOGLE_CLIENT_SECRET is set');
  console.log(`   ${clientSecret.substring(0, 10)}...\n`);
} else {
  console.log('❌ GOOGLE_CLIENT_SECRET is not set or using placeholder\n');
}

if (callbackUrl) {
  console.log('✅ GOOGLE_CALLBACK_URL is set');
  console.log(`   ${callbackUrl}\n`);
} else {
  console.log('❌ GOOGLE_CALLBACK_URL is not set\n');
}

console.log('=====================================\n');
console.log('📋 Next Steps:\n');
console.log('1. Go to Google Cloud Console:');
console.log('   https://console.cloud.google.com/apis/credentials\n');
console.log('2. Click on your OAuth 2.0 Client ID\n');
console.log('3. Add these Authorized redirect URIs:');
console.log('   - http://localhost:5000/api/auth/google/callback');
console.log('   - https://your-production-backend.com/api/auth/google/callback\n');
console.log('4. Add these Authorized JavaScript origins:');
console.log('   - http://localhost:3000');
console.log('   - https://your-production-frontend.com\n');
console.log('5. Save changes\n');
console.log('6. Start your servers:');
console.log('   Backend: npm start (in backend folder)');
console.log('   Frontend: npm start (in frontend folder)\n');
console.log('7. Test: Go to http://localhost:3000/login');
console.log('   Click "Continue with Google"\n');
console.log('=====================================\n');
