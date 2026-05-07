/* ========== main.js ==========
   GSAP animations, ScrollTrigger, i18n, interactions
   ========================================= */

// ===== REGISTER PLUGINS =====
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== i18n TRANSLATIONS =====
const translations = {
  en: {
    "nav.about": "About", "nav.skills": "Skills", "nav.projects": "Projects",
    "nav.journey": "Journey", "nav.contact": "Contact",
    "hero.subtitle": "Information System Engineer & Data Scientist",
    "hero.badge": "Based in İstanbul", "hero.scroll": "Scroll",
    "about.label": "About Me", "about.title": "Bridging Data & Code",
    "about.p1": "I am a graduate of Kocaeli University, Information Systems Engineering. I am an engineer who continuously learns in the fields of data science, automation, and artificial intelligence, exploring modern technologies to produce effective and scalable solutions.",
    "about.p2": "In addition to data science, I am also developing myself in cloud computing and full-stack web development. I believe the most powerful solutions emerge at the intersection of different disciplines; I aim to develop user-centric systems by combining technical competence with a problem-solving approach.",
    "about.note": "\"Stay curious, build relentlessly, ship fearlessly.\"",
    "skills.label": "Toolkit", "skills.title": "What I Work With",
    "skills.cat1": "Programming Languages", "skills.desc1": "Python (Pandas, NumPy, Scikit-learn, PyTorch) · C# (.NET Framework, LINQ, Entity Framework Core) · SQL",
    "skills.cat2": "Databases", "skills.desc2": "MySQL · PostgreSQL · Microsoft SQL Server · Firebase · Supabase",
    "skills.cat3": "Data Science & ML", "skills.desc3": "Machine Learning · Deep Learning · Data Analysis · Model Evaluation · Feature Engineering",
    "skills.cat4": "Tools & DevOps", "skills.desc4": "Docker · Git · GitHub · RabbitMQ · Apache Kafka · Spark Streaming · Postman",
    "skills.cat5": "IDEs & Environments", "skills.desc5": "Cursor IDE · Antigravity · Android Studio · IntelliJ IDEA · Google Colab · Jupyter Notebook",
    "skills.cat6": "Other", "skills.desc6": "Claude · ChatGPT · MCP · Agentic Coding · n8n Automation · Gemini CLI · Google Cloud",
    "projects.label": "Selected Work", "projects.title": "Projects",
    "proj.1.desc": "A deep learning application classifying brain MRI images into different tumor types using the BEiT Transformer model. Achieves high accuracy on multi-class classification.",
    "proj.2.desc": "Real-time anomaly detection on ECG datasets using Apache Kafka for streaming and Apache Spark for processing. Identifies irregular heartbeat patterns instantly.",
    "proj.3.desc": "A mobile AR application built with Unity engine, bringing solar system exploration into augmented reality. Interactive 3D planetary models with educational content.",
    "proj.4.desc": "An AI-powered platform helping reunite lost pets with their owners. Uses image recognition and matching algorithms to identify animals from photos.",
    "proj.5.desc": "Captures a Sudoku puzzle via camera, recognizes digits using computer vision, solves it algorithmically, and overlays the solution in real-time.",
    "proj.6.desc": "A cloud-based web application for converting files between different formats. Serverless architecture ensures scalability and fast processing.",
    "journey.label": "Journey", "journey.title": "My Path So Far",
    "journey.y1": "Feb 2025 - Jun 2025",
    "journey.t1": "Matriks Financial Technologies — Software Dev Intern",
    "journey.d1": "Designed and developed automated trading bots on the Matriks Data Terminal using C#. Ensured control and automation of indicator operations with C#. Implemented algorithm design and utilization.",
    "journey.y2": "Aug 2024 - Sep 2024",
    "journey.t2": "Kocaeli Univ. Embedded Systems Lab — Software Intern",
    "journey.d2": "Assisted in embedded software development and laboratory research projects.",
    "journey.y3": "Jun 2024 - Jul 2024",
    "journey.t3": "Aksoy Çözüm — Software & Process Dev. Intern",
    "journey.d3": "Worked on the digitalization of corporate business processes. Designed complex workflows on the eBA platform and optimized background processes with MsSQL database integrations.",
    "contact.label": "Get in Touch", "contact.title": "Let's Build Something Together",
    "contact.desc": "I'm always excited about new opportunities, collaborations, and interesting projects. Feel free to reach out.",
    "contact.name": "Your Name", "contact.email": "Your Email", "contact.message": "Your Message", "contact.send": "Send Message",
    "footer.text": "Crafted with code & curiosity"
  },
  tr: {
    "nav.about": "Hakkımda", "nav.skills": "Yetenekler", "nav.projects": "Projeler",
    "nav.journey": "Yolculuk", "nav.contact": "İletişim",
    "hero.subtitle": "Bilişim Sistemleri Mühendisi & Veri Bilimci",
    "hero.badge": "İstanbul'da yaşıyor", "hero.scroll": "Kaydır",
    "about.label": "Hakkımda", "about.title": "Veri & Kod Arasında Köprü",
    "about.p1": "Kocaeli Üniversitesi Bilişim Sistemleri Mühendisliği mezunuyum. Veri bilimi, otomasyon ve yapay zeka alanlarında sürekli öğrenen; modern teknolojileri keşfederek etkili ve ölçeklenebilir çözümler üreten bir mühendisim.",
    "about.p2": "Veri biliminin yanı sıra bulut bilişim ve full-stack web geliştirme alanlarında da kendimi geliştiriyorum. En güçlü çözümlerin, farklı disiplinlerin kesişiminde ortaya çıktığına inanıyor; teknik yetkinlik ile problem çözme yaklaşımını bir araya getirerek kullanıcı odaklı sistemler geliştirmeyi hedefliyorum.",
    "about.note": "\"Meraklı kal, durmadan inşa et, korkusuzca yayınla.\"",
    "skills.label": "Araç Kutusu", "skills.title": "Nelerle Çalışıyorum",
    "skills.cat1": "Programlama Dilleri", "skills.desc1": "Python (Pandas, NumPy, Scikit-learn, PyTorch) · C# (.NET Framework, LINQ, Entity Framework Core) · SQL",
    "skills.cat2": "Veritabanları", "skills.desc2": "MySQL · PostgreSQL · Microsoft SQL Server · Firebase · Supabase",
    "skills.cat3": "Veri Bilimi & Makine Öğrenmesi", "skills.desc3": "Makine Öğrenmesi · Derin Öğrenme · Veri Analizi · Model Değerlendirme · Özellik Mühendisliği",
    "skills.cat4": "Araçlar & DevOps", "skills.desc4": "Docker · Git · GitHub · RabbitMQ · Apache Kafka · Spark Streaming · Postman",
    "skills.cat5": "Geliştirme Ortamları & IDE'ler", "skills.desc5": "Cursor IDE · Antigravity · Android Studio · IntelliJ IDEA · Google Colab · Jupyter Notebook",
    "skills.cat6": "Diğer", "skills.desc6": "Claude · ChatGPT · MCP · Agentic Coding · n8n Automation · Gemini CLI · Google Cloud",
    "projects.label": "Seçili Çalışmalar", "projects.title": "Projeler",
    "proj.1.desc": "BEiT Transformer modeli kullanarak beyin MR görüntülerini farklı tümör türlerine sınıflandıran derin öğrenme uygulaması.",
    "proj.2.desc": "Apache Kafka ile akış ve Apache Spark ile işleme kullanarak EKG veri setlerinde gerçek zamanlı anomali tespiti.",
    "proj.3.desc": "Unity motoru ile geliştirilen, güneş sistemi keşfini artırılmış gerçekliğe taşıyan mobil AR uygulaması.",
    "proj.4.desc": "Kayıp hayvanları sahipleriyle buluşturmaya yardımcı olan yapay zeka destekli platform.",
    "proj.5.desc": "Kamera ile Sudoku bulmacası yakalayan, rakamları tanıyan, algoritmik çözen ve çözümü gerçek zamanlı gösteren uygulama.",
    "proj.6.desc": "Dosyaları farklı formatlar arasında dönüştüren bulut tabanlı web uygulaması.",
    "journey.label": "Yolculuk", "journey.title": "Şimdiye Kadarki Yolum",
    "journey.y1": "Şubat 2025 - Haziran 2025",
    "journey.t1": "Matriks Financial Technologies — Yazılım Stajyeri",
    "journey.d1": "C# kullanarak Matriks Veri Terminali üzerinden otomatik al-sat yapan botlar tasarladım ve geliştirdim. C# ile indikatör işlemlerinin kontrolünü ve otomasyonunu sağladım. Algoritma tasarımı ve kullanımını gerçekleştirdim.",
    "journey.y2": "Ağustos 2024 - Eylül 2024",
    "journey.t2": "Kocaeli Üni. Gömülü Sistemler Lab. — Yazılım Stajyeri",
    "journey.d2": "Gömülü sistemler ve yazılım geliştirme projelerinde görev aldım.",
    "journey.y3": "Haziran 2024 - Temmuz 2024",
    "journey.t3": "Aksoy Çözüm — Software & Process Dev. Intern",
    "journey.d3": "Kurumsal iş süreçlerinin dijitalleştirilmesi üzerine çalıştım. eBA platformu üzerinde karmaşık iş akışlarını tasarlayıp, MsSQL veritabanı entegrasyonlarıyla arka plan süreçlerini optimize ettim.",
    "contact.label": "İletişime Geç", "contact.title": "Birlikte Bir Şeyler İnşa Edelim",
    "contact.desc": "Yeni fırsatlar, işbirlikleri ve ilginç projeler konusunda her zaman heyecanlıyım. Bana ulaşmaktan çekinmeyin.",
    "contact.name": "Adınız", "contact.email": "E-posta Adresiniz", "contact.message": "Mesajınız", "contact.send": "Mesaj Gönder",
    "footer.text": "Kod ve merak ile üretildi"
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang, initial = false) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.getElementById('lang-switch').textContent = lang === 'en' ? 'TR' : 'EN';
  
  const elements = document.querySelectorAll('[data-i18n]');
  
  if (initial) {
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
    });
  } else {
    // Smooth transition
    gsap.to(elements, {
      opacity: 0,
      y: -5,
      duration: 0.2,
      stagger: 0.005,
      ease: "power2.in",
      onComplete: () => {
        elements.forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[lang][key]) el.textContent = translations[lang][key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
          const key = el.getAttribute('data-i18n-placeholder');
          if (translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
        });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.005,
          ease: "power2.out"
        });
      }
    });
  }
}

document.getElementById('lang-switch').addEventListener('click', () => {
  setLang(currentLang === 'en' ? 'tr' : 'en');
});

// Apply saved lang
if (currentLang !== 'en') setLang(currentLang, true);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (window.matchMedia('(pointer: fine)').matches) {
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });
  const fxTo = gsap.quickTo(follower, 'x', { duration: 0.5, ease: 'power3' });
  const fyTo = gsap.quickTo(follower, 'y', { duration: 0.5, ease: 'power3' });
  document.addEventListener('mousemove', e => {
    xTo(e.clientX); yTo(e.clientY);
    fxTo(e.clientX); fyTo(e.clientY);
  });
}

// ===== LOADER =====
const loaderTl = gsap.timeline({
  onComplete() {
    document.getElementById('loader').style.display = 'none';
    try { initAnimations(); } catch(e) { console.warn('Animation init error:', e); }
    try { initCanvasArt(); } catch(e) { console.warn('Canvas art init error:', e); }
  }
});
loaderTl
  .to('.loader-bar-fill', { width: '100%', duration: 1.8, ease: 'power2.inOut' })
  .to('#loader', { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, '+=0.2');

// ===== NAV SCROLL STATE =====
ScrollTrigger.create({
  start: 80,
  onUpdate(self) {
    document.getElementById('nav').classList.toggle('scrolled', self.progress > 0 || window.scrollY > 80);
  }
});

// ===== MAIN ANIMATIONS =====
// ===== MANUAL CHAR SPLIT (replaces premium SplitText) =====
function splitTextToChars(el) {
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);
  const chars = [];
  for (const char of text) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

function initAnimations() {
  // Hero character animation (manual split)
  const heroTitle = document.getElementById('hero-title');
  const chars = splitTextToChars(heroTitle);
  gsap.from(chars, {
    y: 80, opacity: 0, rotationX: -60,
    stagger: 0.035, duration: 0.9,
    ease: 'back.out(1.7)',
    delay: 0.1
  });
  gsap.from('.hero-animoji', { scale: 0, rotation: -20, opacity: 0, duration: 0.8, ease: 'back.out(2)', delay: 0.4 });
  gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
  gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, delay: 0.85, ease: 'power3.out' });
  gsap.from('.scroll-indicator', { opacity: 0, duration: 1, delay: 1.4 });

  // Floating effect on animoji
  gsap.to('.hero-animoji', {
    y: -10, rotation: 5, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true
  });

  // Hero parallax on scroll
  gsap.to('.hero-content', {
    yPercent: 30, opacity: 0,
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // ===== ABOUT =====
  gsap.from('.about-photo', {
    x: -60, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 70%' }
  });
  gsap.from('.about-text > *', {
    y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-text', start: 'top 75%' }
  });

  // ===== SKILLS BENTO =====
  ScrollTrigger.batch('.bento-card', {
    onEnter(elements) {
      gsap.from(elements, {
        y: 50, opacity: 0, scale: 0.95,
        stagger: 0.08, duration: 0.7, ease: 'power3.out'
      });
    },
    start: 'top 85%',
    once: true
  });

  // Bento card tilt on hover
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { 
        rotationY: x * 20, 
        rotationX: -y * 20, 
        scale: 1.05,
        zIndex: 10,
        duration: 0.3, 
        ease: 'power2.out', 
        transformPerspective: 600,
        boxShadow: "0 20px 40px rgba(14,14,19,0.15)"
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        rotationY: 0, 
        rotationX: 0, 
        scale: 1,
        zIndex: 1,
        duration: 0.6, 
        ease: 'power3.out',
        boxShadow: "0 0px 0px rgba(14,14,19,0)"
      });
    });
  });

  // ===== PROJECTS HORIZONTAL SCROLL =====
  const track = document.querySelector('.projects-track');
  if (track) {
    const totalScroll = track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top top',
        end: () => '+=' + totalScroll,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // Project cards entrance
    gsap.from('.project-card', {
      opacity: 0, y: 40,
      stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#projects', start: 'top 80%', once: true }
    });
  }

  // ===== JOURNEY TIMELINE =====
  gsap.from('.timeline-item', {
    y: 50, opacity: 0,
    stagger: 0.2, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.timeline', start: 'top 75%' }
  });

  // Timeline line draw
  gsap.from('.timeline::before', {
    scaleY: 0, transformOrigin: 'top',
    scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 60%', scrub: true }
  });

  // ===== CONTACT =====
  gsap.from('.contact-grid > *', {
    y: 40, opacity: 0,
    stagger: 0.15, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });

  gsap.from('.contact-link', {
    x: -30, opacity: 0,
    stagger: 0.1, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-links', start: 'top 80%' }
  });

  // ===== SECTION LABELS =====
  gsap.from('.section-label', {
    y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.section-label', start: 'top 85%' },
    stagger: { each: 0.1, from: 'start' }
  });
}

// ===== CANVAS ART INIT =====
const artDestroyFns = [];

function initCanvasArt() {
  // Hero — Wave Field
  const heroEl = document.getElementById('hero');
  if (heroEl && typeof createWaveField === 'function') {
    artDestroyFns.push(createWaveField(heroEl));
  }





  // Contact — Double Helix
  const helixEl = document.getElementById('art-helix');
  if (helixEl && typeof createHelix === 'function') {
    artDestroyFns.push(createHelix(helixEl, 380, 320));
  }

  // Floating animation for art containers
  gsap.utils.toArray('.floating-art').forEach(el => {
    gsap.to(el, {
      y: 'random(-15, 15)', rotation: 'random(-3, 3)',
      duration: 'random(3, 5)', ease: 'sine.inOut',
      repeat: -1, yoyo: true
    });
  });
}

// ===== SMOOTH NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1, ease: 'power3.inOut'
      });
    }
  });
});
