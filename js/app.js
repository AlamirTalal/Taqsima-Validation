(function() {
  'use strict';

  // ========== THEME ==========
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('taqsema-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('taqsema-theme', newTheme);
    icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  });

  // ========== LANGUAGE ==========
  const langToggle = document.getElementById('langToggle');
  const html = document.documentElement;
  const savedLang = localStorage.getItem('taqsema-lang') || 'ar';
  function applyLang(lang) {
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
    localStorage.setItem('taqsema-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
  }
  const translations = {
    ar: {
      brand: 'تقسيمة',
      heroBadge: 'قريباً في مصر',
      heroTitle: 'احجز ملعبك، قسم صحابك، وانطلق في المنافسة',
      heroDesc: 'تقسيمة أول مجتمع كروي متكامل في مصر. حجز ملاعب خماسية وسباعية وحداشر، تقسيمة سريعة للفرق، نظام نقاط، سوشيال كروي، ومسابقات.',
      heroCta: 'سجل مسبقاً مجاناً',
      statPitches: 'ملاعب متاحة',
      statPlayers: 'لاعب مهتم',
      statBooking: 'حجز متاح',
      floatPoints: '+3 نقاط!',
      floatSplit: 'تم التقسيمة!',
      featuresTag: 'ماذا يقدم لك؟',
      featuresTitle: 'كل اللي محتاجه اللاعب في مكان واحد',
      feat1Title: 'حجز ملاعب ذكي',
      feat1Desc: 'خماسي، سباعي، حداشر. احجز في ثواني وشوف المواعيد المتاحة.',
      feat2Title: 'تقسيمة تلقائية',
      feat2Desc: 'جمع صحابك وقسمهم فرقتين متوازيتين والمراكز.',
      feat3Title: 'نظام النقاط',
      feat3Desc: 'كل فريق كسبان بيجمع نقاط. ترتيب، مستويات، ومنافسة مستمرة بين صحابك.',
      feat4Title: 'سوشيال كروي',
      feat4Desc: 'بوستات، ريلز، هايلايتس من الماتشات. مجتمعك الكروي كله هنا.',
      feat5Title: 'صفحة دردشة',
      feat5Desc: 'نظم ماتشك، ناقش التكتيك، وافضل على تواصل مع صحابك داخل التطبيق.',
      feat6Title: 'مسابقات ودوريات',
      feat6Desc: 'دورات رمضانية، بطولات شهرية وتحديات مستمرة على مدار السنة.'
    },
    en: {
      brand: 'Taqsima',
      heroBadge: 'Coming Soon to Egypt',
      heroTitle: 'Book your pitch, split your squad, and compete',
      heroDesc: 'Taqsima is Egypt\'s first all-in-one football community. Book 5/7/11-a-side pitches, auto-split teams, points system, social feed, and tournaments.',
      heroCta: 'Register Free',
      statPitches: 'Pitch Types',
      statPlayers: 'Interested Players',
      statBooking: 'Booking Available',
      floatPoints: '+3 Points!',
      floatSplit: 'Teams Split!',
      featuresTag: 'What we offer',
      featuresTitle: 'Everything a player needs in one place',
      feat1Title: 'Smart Pitch Booking',
      feat1Desc: '5-a-side, 7-a-side, 11-a-side. Book in seconds and see available slots.',
      feat2Title: 'Split Teams',
      feat2Desc: 'Gather your friends and split them into balanced teams by position.',
      feat3Title: 'Points System',
      feat3Desc: 'Winning teams collect points. Rankings, levels, and ongoing competition among friends.',
      feat4Title: 'Football Social media',
      feat4Desc: 'Posts, reels, match highlights. Your football community is all here.',
      feat5Title: 'Chatting Page',
      feat5Desc: 'Organize your match, discuss tactics, and stay connected with friends in the app.',
      feat6Title: 'Tournaments & Leagues',
      feat6Desc: 'Ramadan tournaments, monthly tournaments, and year-round challenges.'
    }
  };
  langToggle.addEventListener('click', () => {
    const current = html.lang;
    applyLang(current === 'ar' ? 'en' : 'ar');
  });

  applyLang(savedLang);

  // ========== FEATURES SLIDER ==========
  const track = document.getElementById('featuresTrack');
  const cards = track.querySelectorAll('.feature-card');
  const dotsContainer = document.getElementById('featuresDots');
  const prevBtn = document.getElementById('featPrev');
  const nextBtn = document.getElementById('featNext');
  const slider = document.getElementById('featuresSlider');
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  const totalPages = Math.ceil(cards.length / cardsPerView);

  function getCardsPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 24; // gap 24px
    track.style.transform = `translateX(${currentIndex * cardWidth * cardsPerView * (html.dir === 'rtl' ? 1 : -1)}px)`;
    document.querySelectorAll('#featuresDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => { currentIndex = i; updateSlider(); });
      dotsContainer.appendChild(dot);
    }
  }
  createDots();

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalPages;
    updateSlider();
  });
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    updateSlider();
  });

  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalPages;
    updateSlider();
  }, 5000);

  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalPages;
      updateSlider();
    }, 5000);
  });

  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % totalPages;
      } else {
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
      }
      updateSlider();
    }
  });

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    currentIndex = 0;
    updateSlider();
  });

  // Scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add CSS class for visible elements via JS injection
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ========== TESTIMONIALS SLIDER ==========
  const testTrack = document.getElementById('testTrack');
  const testCards = testTrack.querySelectorAll('.testimonial-card');
  const testDotsContainer = document.getElementById('testDots');
  const testPrev = document.getElementById('testPrev');
  const testNext = document.getElementById('testNext');
  const testSlider = document.getElementById('testSlider');
  let testIndex = 0;
  let testPerView = getTestPerView();
  let testPages = Math.ceil(testCards.length / testPerView);

  function getTestPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function updateTestSlider() {
    const tw = testCards[0].offsetWidth + 24;
    testTrack.style.transform = `translateX(${testIndex * tw * testPerView * (html.dir === 'rtl' ? 1 : -1)}px)`;
    document.querySelectorAll('#testDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === testIndex);
    });
  }

  function createTestDots() {
    testDotsContainer.innerHTML = '';
    for (let i = 0; i < testPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => { testIndex = i; updateTestSlider(); });
      testDotsContainer.appendChild(dot);
    }
  }
  createTestDots();

  testNext.addEventListener('click', () => { testIndex = (testIndex + 1) % testPages; updateTestSlider(); });
  testPrev.addEventListener('click', () => { testIndex = (testIndex - 1 + testPages) % testPages; updateTestSlider(); });

  let testAuto = setInterval(() => { testIndex = (testIndex + 1) % testPages; updateTestSlider(); }, 6000);
  testSlider.addEventListener('mouseenter', () => clearInterval(testAuto));
  testSlider.addEventListener('mouseleave', () => {
    testAuto = setInterval(() => { testIndex = (testIndex + 1) % testPages; updateTestSlider(); }, 6000);
  });

  let testTouchX = 0;
  testSlider.addEventListener('touchstart', e => { testTouchX = e.touches[0].clientX; });
  testSlider.addEventListener('touchend', e => {
    const diff = testTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      testIndex = diff > 0 ? (testIndex + 1) % testPages : (testIndex - 1 + testPages) % testPages;
      updateTestSlider();
    }
  });

  window.addEventListener('resize', () => {
    testPerView = getTestPerView();
    testPages = Math.ceil(testCards.length / testPerView);
    testIndex = 0;
    createTestDots();
    updateTestSlider();
  });

  // Scroll observer for new sections
  document.querySelectorAll('.step, .testimonial-card, .register-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ========== FORM VALIDATION ==========
  const form = document.getElementById('registerForm');
  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('whatsapp');
  const nameError = document.getElementById('nameError');
  const whatsappError = document.getElementById('whatsappError');
  const phoneError = document.getElementById('phoneError');
  const successMsg = document.getElementById('formSuccess');

  function setError(el, msg) {
    el.classList.remove('shake');
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
    if (msg) {
      void el.offsetWidth;
      el.classList.add('shake');
      setTimeout(() => el.classList.remove('shake'), 400);
    }
  }

  [nameError, whatsappError, phoneError].forEach(el => el.style.display = 'none');

  form.addEventListener('submit', e => {
    e.preventDefault();
    successMsg.classList.remove('visible');
    let valid = true;
    const isAr = html.lang === 'ar';

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameError, isAr ? 'من فضلك ادخل اسم صحيح' : 'Please enter a valid name');
      valid = false;
    } else {
      setError(nameError, '');
    }

    const phoneVal = phoneInput.value.trim().replace(/\s/g, '');
    if (!/^01[0-9]{9}$/.test(phoneVal)) {
      setError(whatsappError, isAr ? 'رقم واتساب صحيح مثال 01xxxxxxxxx' : 'Valid WhatsApp number required');
      valid = false;
    } else {
      setError(whatsappError, '');
    }

    const phoneType = form.querySelector('input[name="phoneType"]:checked');
    if (!phoneType) {
      setError(phoneError, isAr ? 'اختار نوع الموبايل' : 'Please select your phone type');
      valid = false;
    } else {
      setError(phoneError, '');
    }

    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = isAr ? 'جاري الإرسال...' : 'Sending...';

    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then(response => {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = originalText;
      if (response.ok) {
        successMsg.classList.add('visible');
        form.reset();
      } else {
        setError(nameError, isAr ? 'حدث خطأ، جرب تاني.' : 'Something went wrong, try again.');
      }
    })
    .catch(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = originalText;
      setError(nameError, isAr ? 'حدث خطأ، جرب تاني.' : 'Something went wrong, try again.');
    });
  });

  [nameInput, phoneInput].forEach(inp => {
    inp.addEventListener('input', () => {
      const err = inp.id === 'fullName' ? nameError : whatsappError;
      if (err.textContent) setError(err, '');
    });
  });

  form.querySelectorAll('input[name="phoneType"]').forEach(r => {
    r.addEventListener('change', () => setError(phoneError, ''));
  });

  // ========== EXTENDED TRANSLATIONS ==========
  translations.ar.howTag = 'كيف تلعب؟';
  translations.ar.howTitle = '3 خطوات وبتلعب';
  translations.ar.step1Title = 'احجز الملعب';
  translations.ar.step1Desc = 'اختار ملعبك، التوقيت، والنوع - خماسي، سباعي، أو حداشر.';
  translations.ar.step2Title = 'اعمل التقسيمة';
  translations.ar.step2Desc = 'ضيف صحابك، وقسملهم فرقتين متوازيتين.';
  translations.ar.step3Title = 'العب واكسب نقاط';
  translations.ar.step3Desc = 'انزل الملعب، تنافس، والفريق الكسبان بيجمع نقاط.';
  translations.ar.testTag = 'صوت اللاعبين';
  translations.ar.testTitle = 'ناس جربت التجربة';
  translations.ar.test1Text = '"أخيراً محتاجش أتصل بعشرين ملعب عشان الاقي ملعب فاضي."';
  translations.ar.test2Text = '"نظام النقاط خلانا نتنافس بين صحابنا كل أسبوع."';
  translations.ar.test3Text = '"التطبيق رتب لي المواعيد والفلوس."';
  translations.ar.test4Text = '"السوشيال ميديا فكرة جامدة. بنزل ريلز عن الماتشات."';
  translations.ar.test1Role = 'مهاجم';
  translations.ar.test2Role = 'وسط ملعب';
  translations.ar.test3Role = 'صاحب ملعب';
  translations.ar.test4Role = 'حارس مرمى';
  translations.ar.regTitle = 'كن من أوائل اللاعبين';
  translations.ar.regDesc = 'سجل بياناتك دلوقتي وخلي صحابك على تواصل.';
  translations.ar.regBen1 = 'تسجيل مجاني تماماً';
  translations.ar.regBen2 = 'أولوية الوصول للنسخة التجريبية';
  translations.ar.regBen3 = 'هدايا حصرية للمسجلين المبكرين';
  translations.ar.labelName = 'الاسم الكامل';
  translations.ar.labelWhatsapp = 'رقم واتساب';
  translations.ar.labelPhone = 'نوع الموبايل';
  translations.ar.placeholderName = 'محمد أحمد';
  translations.ar.placeholderWhatsapp = '01x xxx xxxxx';
  translations.ar.android = 'Android';
  translations.ar.iphone = 'iPhone';
  translations.ar.submitBtn = 'سجل دلوقتي';
  translations.ar.successMsg = 'تم التسجيل! هنبعتلك إشعار أول ما نطلق.';
  translations.ar.footerDesc = 'أول مجتمع كروي متكامل في مصر.';
  translations.ar.footerFeatures = 'المميزات';
  translations.ar.footerContact = 'تواصل';
  translations.ar.copyright = '2026 تقسيمة. كل الحقوق محفوظة.';

  translations.en.howTag = 'How to play?';
  translations.en.howTitle = '3 steps and you play';
  translations.en.step1Title = 'Book the pitch';
  translations.en.step1Desc = 'Choose your pitch, time, and type - 5, 7, or 11-a-side.';
  translations.en.step2Title = 'Split teams';
  translations.en.step2Desc = 'Add your friends,split them into balanced teams.';
  translations.en.step3Title = 'Play and earn points';
  translations.en.step3Desc = 'Hit the pitch, compete, winning team collects points on the leaderboard.';
  translations.en.testTag = 'Player voices';
  translations.en.testTitle = 'People who tried it';
  translations.en.test1Text = '"Finally no need to call twenty pitches to find one with free time."';
  translations.en.test2Text = '"The points system made us compete every week."';
  translations.en.test3Text = '"The app organized my schedule and payments."';
  translations.en.test4Text = '"Social feed is cool. We share match highlights."';
  translations.en.test1Role = 'Striker';
  translations.en.test2Role = 'Midfielder';
  translations.en.test3Role = 'Pitch Owner';
  translations.en.test4Role = 'Goalkeeper';
  translations.en.regTitle = 'Be among the first players';
  translations.en.regDesc = 'Register now and stay connected with your friends.';
  translations.en.regBen1 = 'Completely free registration';
  translations.en.regBen2 = 'Priority beta access';
  translations.en.regBen3 = 'Exclusive gifts for early adopters';
  translations.en.labelName = 'Full name';
  translations.en.labelWhatsapp = 'WhatsApp number';
  translations.en.labelPhone = 'Phone type';
  translations.en.placeholderName = 'John Doe';
  translations.en.placeholderWhatsapp = '01x xxx xxxxx';
  translations.en.android = 'Android';
  translations.en.iphone = 'iPhone';
  translations.en.submitBtn = 'Register now';
  translations.en.successMsg = 'Registered! We will notify you on launch.';
  translations.en.footerDesc = "Egypt's first all-in-one football community.";
  translations.en.footerFeatures = 'Features';
  translations.en.footerContact = 'Contact';
  translations.en.copyright = '2026 Taqsima. All rights reserved.';

  // Re-apply translations to new elements
  applyLang(html.lang);

})();
