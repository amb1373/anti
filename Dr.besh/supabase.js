// ===================================
// SUPABASE CLIENT — Global Connection
// ===================================
// This file initializes the Supabase client and makes it
// available globally as `window.supabase` for all scripts.
// Include this AFTER the Supabase CDN script in your HTML.
// ===================================

const SUPABASE_URL = 'https://gwumpvnkeuoktwacemmm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dW1wdm5rZXVva3R3YWNlbW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NDQyNDAsImV4cCI6MjA5NDMyMDI0MH0.qVI7Km4Ebop13qRmqMY-PtgShkJyzS6hQ3sIMzkdmDs';

// Initialize the Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Make it globally accessible
window.db = supabaseClient;

console.log('✅ Supabase client initialized');
