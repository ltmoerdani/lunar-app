# Halaman Utama Aplikasi Lunar - Fitur & Cara Kerja Detail

## **Konsep Halaman Utama**

Halaman utama Lunar dirancang sebagai **"Command Center"** untuk semua aktivitas puasa - memberikan overview lengkap, akses cepat ke semua fungsi penting, dan guidance yang personal dalam satu layar yang clean dan tidak overwhelming.

## **Layout Struktur Halaman Utama**

### **Header Section (Bagian Atas)**
```
┌─────────────────────────────────────────────────────┐
│  🌙 LUNAR        [Profile] [Settings] [Sync ✅]     │
│                                                     │
│              Assalamualaikum, Ahmad                 │
│           Senin, 13 November 2024                   │
│         الاثنين ٢٠ ربيع الأول ١٤٤٦                  │
└─────────────────────────────────────────────────────┘
```

**Fungsi Header:**
- **Brand Identity**: Logo Lunar dengan brand consistency
- **Personal Greeting**: Salam yang personal dengan nama user
- **Current Date**: Dual calendar (Masehi + Hijriah) yang real-time
- **Sync Status**: Indikator sinkronisasi dengan external calendar
- **Quick Access**: Profile dan settings dalam jangkauan mudah

## **1. Today's Puasa Focus Card (Kartu Fokus Hari Ini)**

### **Konsep:**
Card utama yang mendominasi layar, memberikan semua informasi dan aksi yang dibutuhkan untuk hari ini.

### **Layout & Konten:**
```
┌─────────────────────────────────────────────────────┐
│                 🌟 TODAY'S FOCUS                    │
│                                                     │
│            PUASA SENIN OPPORTUNITY                  │
│                                                     │
│  💫 Bisa niat hari ini:                            │
│     ✨ Puasa Senin (sunnah muakkad)                │
│     🎯 Qadha Ramadan (kalau ada utang)             │
│     📿 Nazar (kalau punya janji)                   │
│                                                     │
│  📊 Analysis Hari Ini:                            │
│     ✅ Schedule: Ringan (optimal)                   │
│     ⚡ Energy Level: High (90%)                    │
│     🎯 Success Rate: 95% based on pattern          │
│                                                     │
│  💡 Smart Recommendation:                          │
│     "Perfect untuk qadha + bonus Senin!            │
│     Last chance weekend prep sebelum busy week."   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [COMMIT PUASA] 🚀    [LIHAT DETAIL] 📋    │   │
│  │  [RESCHEDULE] 🔄      [SKIP HARI INI] ⏭️   │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### **States yang Berbeda:**

**State 1: Opportunity Available (Ada Kesempatan)**
- Background: Soft green gradient
- Primary CTA: "COMMIT PUASA" (prominent)
- Analysis: Positif dan encouraging
- Recommendations: Actionable suggestions

**State 2: Already Committed (Sudah Komit)**
```
┌─────────────────────────────────────────────────────┐
│                 ✅ PUASA ACTIVE                     │
│                                                     │
│               QADHA RAMADAN HARI INI                │
│                                                     │
│  🕐 Waktu Penting:                                 │
│     Sahur: 04:30 (⏰ reminder aktif)               │
│     Imsak: 04:44                                   │
│     Maghrib: 17:52                                 │
│                                                     │
│  ⏰ Countdown: 6 jam 23 menit lagi                 │
│                                                     │
│  💪 "Semangat! Separuh perjalanan sudah dilalui.   │
│      Allah bersamamu dalam ibadah ini."            │
│                                                     │
│  [TRACK PROGRESS] [DOA BERBUKA] [EMERGENCY BREAK]   │
└─────────────────────────────────────────────────────┘
```

**State 3: Rest Day (Hari Istirahat)**
```
┌─────────────────────────────────────────────────────┐
│                 😌 REST & RECOVER                   │
│                                                     │
│                  HARI ISTIRAHAT                     │
│                                                     │
│  🌸 Focus hari ini:                                │
│     • Quality time dengan keluarga                 │
│     • Ibadah lain (sholat, dzikir, tilawah)       │
│     • Persiapan puasa besok                        │
│                                                     │
│  🌟 Besok: Opportunity puasa Selasa                │
│     Jadwal ringan, perfect untuk mulai lagi        │
│                                                     │
│  [PLAN BESOK] [SPIRITUAL ACTIVITIES] [SET REMINDER] │
└─────────────────────────────────────────────────────┘
```

## **2. Quick Status Overview (Ringkasan Status Cepat)**

### **Progress Cards Section:**
```
┌─────────────────────────────────────────────────────┐
│                 📊 QUICK STATUS                     │
│                                                     │
│ ┌──── Bulan Ini ────┐  ┌──── Utang Puasa ────┐    │
│ │                   │  │                      │    │
│ │   Puasa: 8/12     │  │   Qadha: 2/5 hari    │    │
│ │   📈 67% complete │  │   Nazar: 0/3 hari    │    │
│ │   🎯 On track!    │  │   ⏰ Deadline ok     │    │
│ │                   │  │                      │    │
│ └───────────────────┘  └──────────────────────┘    │
│                                                     │
│ ┌──── Streak ────────┐  ┌──── Next Target ────┐    │
│ │                    │  │                      │    │
│ │   Current: 2 weeks │  │   Ayyamul Bidh       │    │
│ │   🔥 Best: 6 weeks │  │   📅 15-17 Nov       │    │
│ │   💪 Strong!       │  │   ⭐ High reward     │    │
│ │                    │  │                      │    │
│ └────────────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### **Cara Kerja Status Cards:**
- **Real-time Update**: Data update otomatis setiap kali ada perubahan
- **Progress Visualization**: Visual bars dan percentages yang mudah dipahami
- **Motivational Messaging**: Copy yang encourage tanpa pressure
- **Tap to Detail**: Tap card untuk detail breakdown

## **3. Upcoming Opportunities (Kesempatan Mendatang)**

### **Layout Horizontal Scroll:**
```
┌─────────────────────────────────────────────────────┐
│               🎯 UPCOMING OPPORTUNITIES              │
│                                                     │
│ ◀ ┌───────────────┐ ┌───────────────┐ ┌──────────┐ ▶│
│   │🌟 Selasa 14   │ │⭐ Kamis 16    │ │🌟 Senin  │  │
│   │Puasa Reguler  │ │Ayyamul Bidh   │ │21 Nov    │  │
│   │95% success    │ │Perfect timing │ │Next week │  │
│   │[Quick Plan]   │ │[High Priority]│ │[Reserve] │  │
│   └───────────────┘ └───────────────┘ └──────────┘  │
└─────────────────────────────────────────────────────┘
```

### **Cara Kerja Opportunities:**
- **Smart Filtering**: Hanya tampilkan 7-10 hari ke depan yang realistic
- **Priority Ranking**: Urutkan berdasarkan importance dan feasibility
- **Quick Actions**: One-tap untuk plan atau commit
- **Horizontal Scroll**: Easy browse tanpa overwhelming

### **Jenis Opportunities yang Ditampilkan:**
- **High Priority**: Ayyamul Bidh, hari-hari khusus Islam
- **Regular Sunnah**: Senin-Kamis yang optimal timing
- **Qadha Opportunities**: Hari-hari yang cocok untuk bayar utang
- **Strategic Days**: Hari yang align dengan personal pattern

## **4. Smart Recommendations Engine**

### **Dynamic Recommendation Cards:**
```
┌─────────────────────────────────────────────────────┐
│                💡 SMART INSIGHTS                    │
│                                                     │
│  Based on your pattern:                             │
│                                                     │
│  🎯 "Week ini perfect untuk Ayyamul Bidh series.    │
│      Schedule relatively light dan energy level     │
│      biasanya tinggi mid-month."                    │
│                                                     │
│  💪 "Consistency score: 85% - excellent! Coba      │
│      challenge puasa Daud bulan depan?"             │
│                                                     │
│  ⚠️ "Heads up: Project deadline 20 Nov. Mungkin    │
│      skip puasa 19-21 Nov atau plan lighter?"      │
│                                                     │
│  [APPLY SUGGESTION] [TELL ME MORE] [NOT NOW]        │
└─────────────────────────────────────────────────────┘
```

### **Tipe Recommendations:**
- **Pattern-Based**: Berdasarkan historical success
- **Calendar-Aware**: Memperhitungkan upcoming schedule
- **Goal-Oriented**: Suggestions untuk mencapai target
- **Health-Conscious**: Recommendations untuk balance
- **Spiritual Growth**: Suggestions untuk level up

## **5. Quick Actions Hub**

### **Action Grid Layout:**
```
┌─────────────────────────────────────────────────────┐
│                ⚡ QUICK ACTIONS                     │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│ │    📅    │ │    🎯    │ │    📊    │ │    📚    ││
│ │ Calendar │ │ Planning │ │ Progress │ │ Learning ││
│ │   View   │ │   Mode   │ │  Track   │ │   Hub    ││
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│ │    🔔    │ │    ⚙️    │ │    🤲    │ │    📖    ││
│ │ Reminder │ │ Settings │ │   Dua    │ │ Niat     ││
│ │  Setup   │ │  & Sync  │ │  Corner  │ │ Builder  ││
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘│
└─────────────────────────────────────────────────────┘
```

### **Fungsi Quick Actions:**
- **Calendar View**: Direct access ke full calendar
- **Planning Mode**: Strategic planning untuk minggu/bulan
- **Progress Track**: Detailed analytics dan insights
- **Learning Hub**: Educational content tentang puasa
- **Reminder Setup**: Customize notification settings
- **Settings & Sync**: Preferences dan calendar integration
- **Dua Corner**: Collection doa-doa puasa
- **Niat Builder**: Helper untuk niat puasa yang benar

## **6. Contextual Notifications Bar**

### **Notification Types:**
```
// Reminder Sahur
🌙 "Reminder: Sahur dalam 30 menit. Sudah siap?"
[Set Alarm] [Prepared] [Skip Tonight]

// Motivation During Fast
💪 "Jam 14:00 - Semangat! Tinggal 4 jam lagi. Allah bersamamu."
[Dua Berbuka] [Track Feeling] [Emergency Break]

// Evening Planning
🌅 "Maghrib sebentar lagi! Mau plan puasa besok?"
[Quick Plan] [Check Tomorrow] [Maybe Later]

// Weekly Review
📊 "Week ini: 3 puasa completed! Mau review progress?"
[View Details] [Plan Next Week] [Celebrate]
```

### **Smart Notification Logic:**
- **Time-Aware**: Different messages untuk different times
- **Context-Sensitive**: Berdasarkan current fasting status
- **Non-Intrusive**: Gentle reminders, not pushy
- **Actionable**: Always provide clear next steps

## **7. Emergency & Support Features**

### **Emergency Break Protocol:**
```
┌─────────────────────────────────────────────────────┐
│                ⚠️ EMERGENCY BREAK                   │
│                                                     │
│  Merasa tidak kuat melanjutkan puasa?               │
│  It's okay, health comes first.                     │
│                                                     │
│  🏥 Medical reasons (sakit, medication)             │
│  🤱 Women's health (periode, hamil, menyusui)       │
│  💧 Severe dehydration or dizziness                 │
│  🧠 Mental health needs                             │
│  🆘 Other urgent situation                          │
│                                                     │
│  💡 "Breaking fast for valid reason tidak apa-apa.  │
│      Qadha bisa dilakukan nanti saat kondisi baik." │
│                                                     │
│  [BREAK FAST SAFELY] [CONSULT HELP] [CONTINUE]      │
└─────────────────────────────────────────────────────┘
```

### **Support System:**
- **Medical Guidance**: Basic health considerations
- **Fiqh Support**: Islamic jurisprudence references
- **Community Help**: Connect dengan experienced fasters
- **Professional Consultation**: Access ke ustadz atau nutritionist

## **8. Adaptive Interface Berdasarkan User Level**

### **Untuk Pemula (Beginner Mode):**
- **Guided Tutorials**: Step-by-step explanation
- **Conservative Recommendations**: Easy wins untuk build confidence
- **Educational Content**: Prominent learning resources
- **Gentle Nudges**: Encouraging tapi tidak pressure

### **Untuk Advanced User:**
- **Compressed Information**: More data dalam less space
- **Advanced Features**: Complex planning dan analytics
- **Challenge Mode**: Harder goals dan achievements
- **Community Leadership**: Mentoring features

### **Untuk User dengan Utang:**
- **Debt Priority**: Prominent qadha tracking
- **Strategic Planning**: Optimal scheduling untuk pelunasan
- **Progress Motivation**: Visual progress toward debt-free
- **Deadline Management**: Smart reminders untuk urgency

## **9. Personalization & Learning System**

### **Behavioral Learning:**
- **Usage Pattern Recognition**: Kapan user paling aktif
- **Success Factor Analysis**: Apa yang bikin user berhasil
- **Preference Learning**: UI/UX yang user prefer
- **Timing Optimization**: Best time untuk notifications

### **Content Personalization:**
- **Mazhab-Specific**: Content sesuai dengan mazhab pilihan
- **Cultural Context**: Local Islamic practices
- **Language Preference**: Bahasa Indonesia, Arab, atau mixed
- **Spiritual Level**: Content difficulty sesuai experience

## **10. Offline Mode Home Screen**

### **Offline Capabilities:**
```
┌─────────────────────────────────────────────────────┐
│  🌙 LUNAR (📡 Offline Mode)                        │
│                                                     │
│                TODAY'S FOCUS                        │
│              (Last synced: 2 hours ago)             │
│                                                     │
│  ✅ Core features available offline:                │
│     📅 Calendar navigation (cached 3 months)       │
│     📊 Personal progress tracking                   │
│     ⏰ Local reminders & notifications              │
│     🤲 Dua collection & niat builder               │
│                                                     │
│  ⚠️ Sync required for:                             │
│     🔄 External calendar updates                    │
│     📈 Latest Islamic calendar verification         │
│     💡 AI recommendations refresh                   │
│                                                     │
│  [TRY SYNC NOW] [CONTINUE OFFLINE]                  │
└─────────────────────────────────────────────────────┘
```

**Hasil Akhir:** Halaman utama yang berfungsi sebagai comprehensive dashboard untuk semua kebutuhan puasa - memberikan overview yang jelas, aksi yang mudah, dan guidance yang personal dalam satu interface yang clean dan powerful.

Similar code found with 4 license types