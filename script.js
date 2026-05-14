// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('navToggle').classList.remove('active');
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ===== FORM SUBMISSION (saves to Supabase) =====
async function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const originalText = btn.textContent;
  
  btn.textContent = document.documentElement.lang === 'fa' ? 'در حال ارسال...' : 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  // Gather form data
  const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value || null;
  const procedure = document.getElementById('procedure').value || null;
  const messageText = document.getElementById('message').value || null;
  const message = procedure ? `[${procedure}] ${messageText || ''}` : messageText;

  try {
    // Insert into Supabase contacts table
    const { data, error } = await window.db
      .from('contacts')
      .insert([{ full_name: fullName, email: email, phone: phone, message: message }]);

    if (error) throw error;

    // Success — show popup
    console.log('✅ Contact saved to Supabase:', data);
    showPopup();

    // Reset form and button
    btn.textContent = originalText;
    btn.style.opacity = '1';
    btn.style.background = '';
    btn.disabled = false;
    document.getElementById('contactForm').reset();

  } catch (err) {
    // Error handling
    console.error('❌ Supabase error:', err);
    btn.textContent = document.documentElement.lang === 'fa' ? '✗ خطا — دوباره تلاش کنید' : '✗ Error — Try Again';
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
}

// ===== SUCCESS POPUP =====
function showPopup() {
  const popup = document.getElementById('successPopup');
  popup.style.display = 'flex';
  // Trigger reflow for animation
  requestAnimationFrame(() => {
    popup.classList.add('active');
  });
}

function closePopup() {
  const popup = document.getElementById('successPopup');
  popup.classList.remove('active');
  setTimeout(() => {
    popup.style.display = 'none';
  }, 300);
}

// Close popup on overlay click
document.addEventListener('click', function(e) {
  const popup = document.getElementById('successPopup');
  if (e.target === popup) {
    closePopup();
  }
});

// ===== COUNTER ANIMATION FOR HERO STATS =====
function animateCounters() {
  const stats = document.querySelectorAll('.hero-stat h3');
  stats.forEach(stat => {
    const text = stat.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    let current = 0;
    const increment = num / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 25);
  });
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero'));
