/* ===================================
   MAVIKENT ASANSÖR - CHATBOT JAVASCRIPT
   Intelligent Decision Tree Chatbot
   =================================== */

'use strict';

// ===================================
// CHATBOT KNOWLEDGE BASE - KARAR AĞACI
// ===================================
const chatbotKnowledgeBase = {
    // ANA KATEGORİLER - SELAMLAŞMA
    greetings: {
        keywords: ['merhaba', 'selam', 'hello', 'hey', 'iyi günler', 'günaydın', 'iyi akşamlar', 'meraba'],
        response: {
            text: "Merhaba! 👋 Mavikent Asansör'e hoş geldiniz. Size nasıl yardımcı olabilirim?",
            quickReplies: [
                { label: "🔧 Hizmetlerimiz", action: "hizmetler" },
                { label: "💰 Fiyat Teklifi Al", action: "teklif" },
                { label: "📞 İletişim Bilgileri", action: "iletisim" },
                { label: "❓ Sıkça Sorulan Sorular", action: "sss" }
            ]
        }
    },

    // ŞİRKET HAKKINDA
    hakkimizda: {
        keywords: ['hakkında', 'kim', 'kurucu', 'firma', 'şirket', 'ne zaman', 'kuruluş', 'hakkınızda', 'kimsiniz'],
        response: {
            text: "Mavikent Asansör, 2016 yılında Salih ve Ahmet Duymuş kardeşler tarafından kuruldu. Elektromekanik Taşıyıcılar Bölümü mezunuyuz ve 9+ yıldır Fethiye, Muğla bölgesinde hizmet veriyoruz.\n\n✅ 500+ Başarılı Proje\n✅ TSE & ISO Sertifikalı\n✅ 7/24 Acil Servis",
            quickReplies: [
                { label: "📜 Belgelerimiz", action: "belgeler" },
                { label: "⭐ Müşteri Yorumları", action: "yorumlar" },
                { label: "🏆 Neden Biz?", action: "avantajlar" }
            ]
        }
    },

    // HİZMETLER
    hizmetler: {
        keywords: ['hizmet', 'ne yapıyor', 'neler yapıyor', 'hizmetler', 'işler'],
        response: {
            text: "Kapsamlı asansör çözümleri sunuyoruz:\n\n1️⃣ Yeni Asansör Montajı\n2️⃣ Bakım & Onarım (7/24)\n3️⃣ Modernizasyon\n4️⃣ Teknik Danışmanlık\n\nHangi hizmetimiz hakkında detaylı bilgi istersiniz?",
            quickReplies: [
                { label: "🏗️ Yeni Montaj", action: "montaj" },
                { label: "🔧 Bakım & Onarım", action: "bakim" },
                { label: "🔄 Modernizasyon", action: "modernizasyon" },
                { label: "💰 Teklif Al", action: "teklif" }
            ]
        }
    },

    montaj: {
        keywords: ['montaj', 'yeni asansör', 'kurulum', 'monte', 'kurmak', 'asansör yaptır', 'asansör kur'],
        response: {
            text: "Yeni Asansör Montajı:\n\n✅ İnsan Asansörleri (6-21 kişi)\n✅ Yük Asansörleri\n✅ Panoramik Kabinler\n✅ Villa Asansörleri\n✅ Hidrolik Sistemler\n\n⏱️ Montaj Süresi: 5-7 iş günü\n🛡️ 3 Yıl Garanti\n\nÜcretsiz keşif için hemen iletişime geçebilirsiniz!",
            quickReplies: [
                { label: "💰 Fiyat Teklifi", action: "teklif" },
                { label: "⏱️ Süreç Nasıl İşler?", action: "surec" },
                { label: "📞 Hemen Ara", action: "ara" }
            ]
        }
    },

    bakim: {
        keywords: ['bakım', 'onarım', 'tamir', 'servis', 'periyodik', 'arıza', 'bozuldu', 'çalışmıyor'],
        response: {
            text: "Bakım & Onarım Hizmetleri:\n\n✅ Periyodik Bakım (Aylık)\n✅ 7/24 Acil Arıza Müdahalesi\n✅ Yedek Parça Değişimi\n✅ Güvenlik Testleri\n\n⚡ Fethiye'de 2 saat içinde müdahale garantisi!\n📅 Yasal zorunluluk: Ayda 1 kez bakım",
            quickReplies: [
                { label: "🚨 Acil Arıza", action: "acil" },
                { label: "📅 Bakım Sözleşmesi", action: "sozlesme" },
                { label: "💰 Fiyat Bilgisi", action: "teklif" }
            ]
        }
    },

    modernizasyon: {
        keywords: ['modernizasyon', 'yenileme', 'güncelleme', 'eski asansör', 'revizyon', 'yenilet'],
        response: {
            text: "Asansör Modernizasyonu:\n\n🔄 Kabin Tasarımı Yenileme\n🔄 Kumanda Sistemleri Güncelleme\n🔄 Enerji Verimliliği İyileştirme\n🔄 Estetik Yükseltme\n\nEski asansörünüzü güncel güvenlik standartlarına kavuşturun!",
            quickReplies: [
                { label: "🏠 Villa Asansörü", action: "villa" },
                { label: "🏢 Bina Asansörü", action: "bina" },
                { label: "💰 Teklif İste", action: "teklif" }
            ]
        }
    },

    villa: {
        keywords: ['villa', 'ev', 'konut', 'müstakil'],
        response: {
            text: "Villa Asansörleri:\n\n🏠 Kompakt tasarım\n🏠 Şık kabin seçenekleri\n🏠 Sessiz çalışma\n🏠 Az yer kaplayan sistemler\n🏠 Özel renk ve malzeme seçenekleri\n\nVillanız için ideal çözümler sunuyoruz!",
            quickReplies: [
                { label: "💰 Fiyat Teklifi", action: "teklif" },
                { label: "📞 Danışmanlık Al", action: "ara" }
            ]
        }
    },

    bina: {
        keywords: ['bina', 'apartman', 'site', 'rezidans', 'iş merkezi'],
        response: {
            text: "Bina Asansörleri:\n\n🏢 6-21 kişilik kapasiteler\n🏢 Yük asansörleri\n🏢 Panoramik kabinler\n🏢 Engelli erişimi uyumlu\n🏢 Enerji verimli sistemler\n\nBinalarınız için profesyonel çözümler!",
            quickReplies: [
                { label: "💰 Fiyat Teklifi", action: "teklif" },
                { label: "📞 Hemen Ara", action: "ara" }
            ]
        }
    },

    // FİYAT & TEKLİF
    fiyat: {
        keywords: ['fiyat', 'ücret', 'maliyet', 'kaç para', 'ne kadar', 'fiyatı', 'pahalı', 'ucuz'],
        response: {
            text: "Fiyatlandırma, projenizin detaylarına göre değişmektedir:\n\n📊 Asansör Tipi\n📊 Kapasite (kişi)\n📊 Kat Sayısı\n📊 Kabin Tasarımı\n📊 Özel Talepler\n\nSize özel bir teklif hazırlamak için ücretsiz keşif yapalım!",
            quickReplies: [
                { label: "📝 Teklif Formu", action: "form" },
                { label: "📞 Hemen Ara", action: "ara" },
                { label: "💬 WhatsApp", action: "whatsapp" }
            ]
        }
    },

    teklif: {
        keywords: ['teklif', 'teklif al', 'teklif iste', 'fiyat öğren', 'fiyat al'],
        response: {
            text: "Harika! Size hemen özel bir teklif hazırlayalım. 📋\n\nİletişim bilgilerinizi paylaşmanız için 2 kolay yol:\n\n1️⃣ Aşağıdaki formu doldurun\n2️⃣ Doğrudan bizi arayın: 0252 612 00 99",
            quickReplies: [
                { label: "📝 İletişim Formu", action: "form" },
                { label: "📞 Hemen Ara", action: "ara" },
                { label: "💬 WhatsApp'tan Yaz", action: "whatsapp" }
            ]
        }
    },

    // BÖLGE & HİZMET ALANI
    bolge: {
        keywords: ['nerede', 'bölge', 'hangi il', 'fethiye', 'muğla', 'hizmet alanı', 'geliyor musunuz', 'nereler', 'şehir'],
        response: {
            text: "Hizmet Bölgemiz:\n\n📍 Muğla (Merkez)\n📍 Fethiye\n📍 Dalaman\n📍 Göcek\n📍 Kalkan\n📍 Kaş\n📍 Ölüdeniz\n\nBu bölgelerde 7/24 hizmetinizdeyiz!",
            quickReplies: [
                { label: "📞 Bölgem İçin Sor", action: "ara" },
                { label: "🚗 Acil Servis", action: "acil" },
                { label: "💬 WhatsApp", action: "whatsapp" }
            ]
        }
    },

    // SÜREÇ
    surec: {
        keywords: ['süreç', 'nasıl', 'adımlar', 'işleyiş', 'prosedür', 'aşama'],
        response: {
            text: "Çalışma Sürecimiz:\n\n1️⃣ İletişim & Keşif (Ücretsiz)\n2️⃣ Proje & Teklif\n3️⃣ Montaj (5-7 iş günü)\n4️⃣ Test & Belgelendirme\n5️⃣ Teslim & Eğitim\n6️⃣ Bakım & Destek (7/24)\n\n✅ Şeffaf, hızlı, güvenilir!",
            quickReplies: [
                { label: "📝 Hemen Başlayalım", action: "teklif" },
                { label: "⏱️ Ne Kadar Sürer?", action: "sure" },
                { label: "🛡️ Garanti", action: "garanti" }
            ]
        }
    },

    sure: {
        keywords: ['ne kadar sürer', 'süre', 'kaç gün', 'teslim', 'zaman'],
        response: {
            text: "⏱️ Montaj Süreleri:\n\n🏠 Standart Asansör: 5-7 iş günü\n🏗️ Hidrolik Asansör: 4-6 iş günü\n🌆 Panoramik Asansör: 7-10 iş günü\n\n⚡ Acil durumlarda hızlandırılmış montaj seçeneği mevcut!",
            quickReplies: [
                { label: "📅 Randevu Al", action: "teklif" },
                { label: "💰 Fiyat Öğren", action: "fiyat" }
            ]
        }
    },

    // GARANTİ & GÜVENLİK
    garanti: {
        keywords: ['garanti', 'güvence', 'sigorta', 'garantisi'],
        response: {
            text: "🛡️ Garanti ve Güvence:\n\n✅ Yeni Montajlarda 3 Yıl Tam Garanti\n✅ Yedek Parçalarda Üretici Garantisi\n✅ TSE Onaylı Ekipman\n✅ Avrupa Standartları (CE)\n\nGaranti kapsamında tüm arızalar ücretsiz onarılır!",
            quickReplies: [
                { label: "📜 Belgelerimiz", action: "belgeler" },
                { label: "🔒 Güvenlik", action: "guvenlik" },
                { label: "💰 Teklif Al", action: "teklif" }
            ]
        }
    },

    guvenlik: {
        keywords: ['güvenlik', 'güvenli', 'tehlike', 'kaza', 'risk'],
        response: {
            text: "🔒 Güvenlik Standartlarımız:\n\n✅ EN 81 Avrupa Asansör Standardı\n✅ Çift güvenlik freni sistemi\n✅ Acil durum telefonu (7/24)\n✅ LED acil aydınlatma\n✅ Aşırı yük sensörü\n✅ Kapı sensörleri\n\nGüvenliğiniz bizim önceliğimiz!",
            quickReplies: [
                { label: "📜 Belgeler", action: "belgeler" },
                { label: "💰 Teklif Al", action: "teklif" }
            ]
        }
    },

    belgeler: {
        keywords: ['belge', 'sertifika', 'tse', 'iso', 'onay', 'ruhsat'],
        response: {
            text: "📜 Sertifikalarımız:\n\n✅ TSE Hizmet Yeri Yeterlilik Belgesi\n✅ Sanayi Bakanlığı Satış Sonrası Hizmet Belgesi\n✅ ISO 9001:2015 Kalite Yönetim Sistemi\n✅ CE İşareti\n\nTüm belgeleri web sitemizden görüntüleyebilirsiniz!",
            quickReplies: [
                { label: "🌐 Belgeleri Gör", action: "site" },
                { label: "📞 Detaylı Bilgi", action: "ara" }
            ]
        }
    },

    avantajlar: {
        keywords: ['neden', 'avantaj', 'fark', 'üstünlük', 'özellik'],
        response: {
            text: "🏆 Neden Mavikent Asansör?\n\n✅ 9+ Yıl Deneyim\n✅ 500+ Başarılı Proje\n✅ TSE & ISO Sertifikalı\n✅ 7/24 Acil Servis\n✅ 2 Saat İçinde Müdahale\n✅ 3 Yıl Garanti\n✅ Şeffaf Fiyatlandırma\n✅ Ücretsiz Keşif",
            quickReplies: [
                { label: "⭐ Yorumlar", action: "yorumlar" },
                { label: "💰 Teklif Al", action: "teklif" }
            ]
        }
    },

    // ACİL DURUM
    acil: {
        keywords: ['acil', 'yardım', 'mahsur', 'sıkıştı', 'takıldı', 'kapandı'],
        response: {
            text: "🚨 ACİL DURUM SERVİSİ\n\n⚡ 7/24 Acil Müdahale Hattı:\n📞 0252 612 00 99\n\n⏱️ Fethiye'de 2 saat içinde yanınızdayız!\n\n⚠️ Asansörde mahsur kaldıysanız sakin olun, hemen arayın!",
            quickReplies: [
                { label: "📞 HEMEN ARA", action: "ara" },
                { label: "💬 WhatsApp", action: "whatsapp" }
            ]
        }
    },

    sozlesme: {
        keywords: ['sözleşme', 'anlaşma', 'kontrat', 'abonelik'],
        response: {
            text: "📋 Bakım Sözleşmesi Avantajları:\n\n✅ Aylık periyodik bakım\n✅ Öncelikli arıza müdahalesi\n✅ İndirimli yedek parça\n✅ Yıllık güvenlik testleri\n✅ 7/24 acil servis\n\nSözleşme detayları için bizimle iletişime geçin!",
            quickReplies: [
                { label: "📞 Bilgi Al", action: "ara" },
                { label: "💰 Fiyat Öğren", action: "fiyat" }
            ]
        }
    },

    // İLETİŞİM
    iletisim: {
        keywords: ['iletişim', 'telefon', 'adres', 'mail', 'email', 'ulaş', 'numara', 'konum'],
        response: {
            text: "📞 İletişim Bilgilerimiz:\n\n☎️ Telefon: 0252 612 00 99\n📧 Email: info@mavikentasansor.com\n📍 Adres: Cumhuriyet Mahallesi, Fethiye/Muğla\n\n🕒 Çalışma Saatleri:\n• Pzt-Cum: 08:00-18:00\n• Cumartesi: 09:00-14:00\n• Acil: 7/24",
            quickReplies: [
                { label: "📞 Hemen Ara", action: "ara" },
                { label: "💬 WhatsApp", action: "whatsapp" },
                { label: "📝 Mesaj Gönder", action: "form" }
            ]
        }
    },

    // YORUMLAR
    yorumlar: {
        keywords: ['yorum', 'müşteri', 'referans', 'değerlendirme', 'görüş'],
        response: {
            text: "⭐ Müşteri Memnuniyeti: %100\n\n💬 Son Yorumlar:\n\n\"Montaj ekibi son derece titiz ve profesyoneldi!\" - Mehmet B.\n\n\"7/24 destek gerçekten işe yarıyor!\" - Ayşe K.\n\n\"Eski asansörümüzü harika modernize ettiler!\" - Can D.",
            quickReplies: [
                { label: "🌐 Tüm Yorumlar", action: "site" },
                { label: "💰 Teklif Al", action: "teklif" }
            ]
        }
    },

    // S.S.S
    sss: {
        keywords: ['sss', 'soru', 'merak', 'sık sorulan'],
        response: {
            text: "❓ Sıkça Sorulan Sorular:\n\nHangi konuda bilgi almak istersiniz?",
            quickReplies: [
                { label: "⏱️ Montaj süresi?", action: "sure" },
                { label: "🛡️ Garanti süresi?", action: "garanti" },
                { label: "💰 Fiyatlar?", action: "fiyat" },
                { label: "📍 Hizmet bölgesi?", action: "bolge" }
            ]
        }
    },

    // TEŞEKKÜR
    tesekkur: {
        keywords: ['teşekkür', 'sağol', 'eyvallah', 'thanks', 'thank'],
        response: {
            text: "Rica ederim! 😊 Size yardımcı olabildiysem ne mutlu bana.\n\nBaşka sorularınız olursa her zaman buradayım. İyi günler dilerim! 🏢",
            quickReplies: [
                { label: "📞 Bizi Arayın", action: "ara" },
                { label: "💬 WhatsApp", action: "whatsapp" }
            ]
        }
    },

    // VEDA
    veda: {
        keywords: ['görüşürüz', 'hoşçakal', 'bye', 'güle güle', 'iyi günler'],
        response: {
            text: "Görüşmek üzere! 👋\n\nHer zaman yanınızdayız. İhtiyacınız olduğunda bizi arayabilirsiniz.\n\n📞 0252 612 00 99\n\nİyi günler dileriz! 🌟",
            quickReplies: []
        }
    },

    // AKSİYONLAR
    ara: {
        keywords: ['ara', 'telefon et', 'arayın'],
        response: {
            text: "📞 Hemen arayabilirsiniz:\n\n0252 612 00 99\n\n(Numaraya tıklayarak direkt arama yapabilirsiniz)",
            action: "call",
            actionData: "tel:+902526120099"
        }
    },

    whatsapp: {
        keywords: ['whatsapp', 'wp', 'mesaj at'],
        response: {
            text: "💬 WhatsApp'tan hızlıca ulaşın!\n\nSize özel mesaj bağlantısı açılıyor...",
            action: "whatsapp",
            actionData: "https://wa.me/902526120099?text=Merhaba%2C%20asans%C3%B6r%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        }
    },

    form: {
        keywords: ['form', 'mesaj gönder', 'bilgi bırak'],
        response: {
            text: "📝 İletişim formumuza yönlendiriliyorsunuz...\n\nFormu doldurarak size en kısa sürede dönüş yapalım!",
            action: "scroll",
            actionData: "#iletisim"
        }
    },

    site: {
        keywords: ['site', 'web', 'internet'],
        response: {
            text: "🌐 Web sitemizde daha fazla bilgi bulabilirsiniz:\n\n• Tüm hizmetlerimiz\n• Referans projelerimiz\n• Belgelerimiz\n• Galeri\n\nYukarıdaki menüden istediğiniz bölüme gidebilirsiniz!"
        }
    },

    // VARSAYILAN (Anlaşılamayan sorular)
    default: {
        response: {
            text: "Üzgünüm, tam olarak anlayamadım. 😅\n\nSize şu konularda yardımcı olabilirim:\n\n• Hizmetlerimiz\n• Fiyat teklifi\n• İletişim bilgileri\n• Teknik sorular\n\nYa da doğrudan 0252 612 00 99 numarasından bizi arayabilirsiniz!",
            quickReplies: [
                { label: "🔧 Hizmetler", action: "hizmetler" },
                { label: "💰 Fiyat", action: "fiyat" },
                { label: "📞 İletişim", action: "iletisim" },
                { label: "❓ S.S.S", action: "sss" }
            ]
        }
    }
};

// ===================================
// CHATBOT MANAGER CLASS
// ===================================
class ChatbotManager {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.isTyping = false;

        // DOM elements will be set after DOM loads
        this.elements = {};

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.initElements();
        if (!this.elements.trigger) {
            console.warn('Chatbot elements not found');
            return;
        }

        this.bindEvents();
        this.loadHistory();

        // Show welcome message after delay if no history
        if (this.conversationHistory.length === 0) {
            setTimeout(() => {
                this.addBotMessage(chatbotKnowledgeBase.greetings.response);
                this.showBadge();
            }, 2000);
        }

        console.log('🤖 Chatbot initialized');
    }

    initElements() {
        this.elements = {
            trigger: document.getElementById('chatbot-trigger'),
            container: document.getElementById('chatbot-container'),
            closeBtn: document.getElementById('chatbot-close'),
            messagesContainer: document.getElementById('chatbot-messages'),
            input: document.getElementById('chatbot-input'),
            sendBtn: document.getElementById('chatbot-send'),
            badge: document.querySelector('.chatbot-badge')
        };
    }

    bindEvents() {
        // Toggle chatbot
        this.elements.trigger.addEventListener('click', () => this.toggle());

        // Close chatbot
        this.elements.closeBtn.addEventListener('click', () => this.close());

        // Send message
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());

        // Enter key to send
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Close on outside click (optional)
        document.addEventListener('click', (e) => {
            if (this.isOpen &&
                !this.elements.container.contains(e.target) &&
                !this.elements.trigger.contains(e.target)) {
                // Uncomment to enable close on outside click
                // this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.elements.container.classList.add('show');
            this.elements.trigger.classList.add('active');
            this.elements.input.focus();
            this.scrollToBottom();
            this.hideBadge();
        } else {
            this.elements.container.classList.remove('show');
            this.elements.trigger.classList.remove('active');
        }
    }

    close() {
        this.isOpen = false;
        this.elements.container.classList.remove('show');
        this.elements.trigger.classList.remove('active');
    }

    showBadge() {
        if (this.elements.badge && !this.isOpen) {
            this.elements.badge.style.display = 'flex';
        }
    }

    hideBadge() {
        if (this.elements.badge) {
            this.elements.badge.style.display = 'none';
        }
    }

    sendMessage() {
        const text = this.elements.input.value.trim();
        if (!text || this.isTyping) return;

        // Add user message
        this.addUserMessage(text);
        this.elements.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Generate bot response after realistic delay
        const delay = 800 + Math.random() * 1200;
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getBotResponse(text);
            this.addBotMessage(response);
        }, delay);
    }

    addUserMessage(text) {
        const message = {
            type: 'user',
            text: text,
            timestamp: new Date().toISOString()
        };

        this.conversationHistory.push(message);
        this.saveHistory();
        this.renderMessage(message);
    }

    addBotMessage(responseObj) {
        const message = {
            type: 'bot',
            text: responseObj.text,
            quickReplies: responseObj.quickReplies || [],
            action: responseObj.action || null,
            actionData: responseObj.actionData || null,
            timestamp: new Date().toISOString()
        };

        this.conversationHistory.push(message);
        this.saveHistory();
        this.renderMessage(message);

        // Execute action if present
        if (message.action) {
            setTimeout(() => this.executeAction(message.action, message.actionData), 1500);
        }
    }

    renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${message.type}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = message.text;

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.formatTime(message.timestamp);

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);

        this.elements.messagesContainer.appendChild(messageDiv);

        // Add quick replies if present
        if (message.quickReplies && message.quickReplies.length > 0) {
            this.renderQuickReplies(message.quickReplies);
        }

        this.scrollToBottom();
    }

    renderQuickReplies(replies) {
        // Remove existing quick replies
        const existing = this.elements.messagesContainer.querySelector('.quick-replies-container');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'quick-replies-container';

        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = reply.label;
            btn.onclick = () => {
                container.remove();
                this.handleQuickReply(reply);
            };
            container.appendChild(btn);
        });

        this.elements.messagesContainer.appendChild(container);
        this.scrollToBottom();
    }

    handleQuickReply(reply) {
        // Add as user message
        this.addUserMessage(reply.label);

        // Show typing and respond
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getBotResponseByAction(reply.action);
            this.addBotMessage(response);
        }, 600);
    }

    getBotResponse(userText) {
        // Normalize Turkish characters for matching
        const normalizedText = userText.toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c');

        // Search knowledge base
        for (const [key, data] of Object.entries(chatbotKnowledgeBase)) {
            if (data.keywords) {
                const matched = data.keywords.some(keyword =>
                    normalizedText.includes(keyword.toLowerCase()
                        .replace(/ı/g, 'i')
                        .replace(/ğ/g, 'g')
                        .replace(/ü/g, 'u')
                        .replace(/ş/g, 's')
                        .replace(/ö/g, 'o')
                        .replace(/ç/g, 'c'))
                );
                if (matched) {
                    return data.response;
                }
            }
        }

        // Default response
        return chatbotKnowledgeBase.default.response;
    }

    getBotResponseByAction(action) {
        if (chatbotKnowledgeBase[action]) {
            return chatbotKnowledgeBase[action].response;
        }
        return chatbotKnowledgeBase.default.response;
    }

    executeAction(action, actionData) {
        switch (action) {
            case 'call':
                window.location.href = actionData;
                break;
            case 'whatsapp':
                window.open(actionData, '_blank');
                break;
            case 'scroll':
                const element = document.querySelector(actionData);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    this.close();
                }
                break;
        }
    }

    showTypingIndicator() {
        this.isTyping = true;

        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        this.elements.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
        }, 50);
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }

    saveHistory() {
        // Keep only last 50 messages
        const recentHistory = this.conversationHistory.slice(-50);
        try {
            localStorage.setItem('mavikent_chat_history', JSON.stringify(recentHistory));
        } catch (e) {
            console.warn('Could not save chat history:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('mavikent_chat_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Render history
                this.conversationHistory.forEach(msg => {
                    this.renderMessage(msg);
                });
            }
        } catch (e) {
            console.warn('Could not load chat history:', e);
            this.conversationHistory = [];
        }
    }

    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('mavikent_chat_history');
        this.elements.messagesContainer.innerHTML = '';
        // Show new welcome
        this.addBotMessage(chatbotKnowledgeBase.greetings.response);
    }
}

// ===================================
// INITIALIZE CHATBOT
// ===================================
window.chatbot = new ChatbotManager();
