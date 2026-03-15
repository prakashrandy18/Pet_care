// Setup script to initialize Supabase database tables
// Run with: node scripts/setup-db.mjs

const SUPABASE_URL = 'https://avxvljigppcyhqcuyruc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2eHZsamlncHBjeWhxY3V5cnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1OTIyMzEsImV4cCI6MjA4OTE2ODIzMX0.dnDTxuyW3Us0hef4duwyNJZGJCUevyvkoGr3CIECYwk';

console.log('╔══════════════════════════════════════════╗');
console.log('║   PS PET CARE — Database Setup Script    ║');
console.log('╚══════════════════════════════════════════╝');
console.log('');
console.log('⚠️  This script cannot create tables via the anon key.');
console.log('   You need to run the SQL in Supabase SQL Editor.');
console.log('');
console.log('📋 Steps:');
console.log('   1. Go to: https://supabase.com/dashboard/project/avxvljigppcyhqcuyruc/sql/new');
console.log('   2. Log in to your Supabase account');
console.log('   3. Copy the contents of /tmp/supabase-setup.sql');
console.log('   4. Paste it into the SQL Editor');
console.log('   5. Click "Run" to execute');
console.log('');
console.log('After running the SQL, create an admin user:');
console.log('   1. Go to: https://supabase.com/dashboard/project/avxvljigppcyhqcuyruc/auth/users');
console.log('   2. Click "Add user" → "Create new user"');
console.log('   3. Enter email: owner@pspetcare.in (or your email)');
console.log('   4. Enter a strong password');
console.log('   5. Toggle "Auto Confirm User" ON');
console.log('   6. Click "Create user"');
console.log('');
console.log('✅ After both steps, the admin panel will be fully functional!');
