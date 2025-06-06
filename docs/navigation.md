# Bottom Navigation Menu Aplikasi Lunar

## **Konsep Bottom Navigation**

Bottom navigation dirancang untuk memberikan akses cepat ke 5 fungsi utama aplikasi Lunar dengan fokus pada journey puasa yang comprehensive namun sederhana.

## **5 Tab Bottom Navigation**

### **1. Today (Hari Ini)**
**Icon:** 🌙 (Bulan sabit)
**Label:** "Today"
**Fungsi Utama:**
- Focus card untuk hari ini
- Status puasa aktif
- Quick decision making
- Emergency actions
- Real-time countdown jika sedang puasa

**Kapan Tab Ini Aktif:**
- Default landing page setelah splash
- Paling sering diakses untuk daily check-in
- Saat user butuh immediate guidance
- Untuk tracking progress puasa yang sedang berjalan

### **2. Calendar (Kalender)**
**Icon:** 📅 (Calendar)
**Label:** "Calendar"
**Fungsi Utama:**
- Full calendar view dengan dual system Hijriah-Masehi
- Month/Week/Today view switching
- Comprehensive planning hingga 3 bulan ke depan
- Historical tracking puasa yang sudah dilakukan
- Multi-source Islamic date verification

**Kapan Tab Ini Aktif:**
- Saat user mau planning jangka panjang
- Checking tanggal-tanggal penting Islam
- Historical review progress puasa
- Strategic planning untuk bulan/season tertentu

### **3. Planning (Perencanaan)**
**Icon:** 🎯 (Target/Dart)
**Label:** "Planning"
**Fungsi Utama:**
- Strategic planning 1-4 minggu ke depan
- Priority-based opportunity list
- Conflict detection dan resolution
- Goal setting dan target management
- Smart scheduling recommendations

**Kapan Tab Ini Aktif:**
- Sunday evening untuk planning minggu
- Awal bulan untuk monthly goal setting
- Saat mau optimize schedule puasa
- Ketika ada perubahan besar di life schedule

### **4. Progress (Progress)**
**Icon:** 📊 (Chart/Analytics)
**Label:** "Progress"
**Fungsi Utama:**
- Personal analytics dan insights
- Debt tracking (qadha, nazar, kafarat)
- Streak management dan achievements
- Pattern analysis dan recommendations
- Motivational dashboard

**Kapan Tab Ini Aktif:**
- Weekly review untuk self-reflection
- Monthly check untuk goal assessment
- Saat butuh motivasi atau encouragement
- Annual review untuk spiritual growth tracking

### **5. More (Lainnya)**
**Icon:** ⚙️ (Settings/Gear)
**Label:** "More"
**Fungsi Utama:**
- Settings dan preferences
- Learning hub dan educational content
- Dua collection dan niat builder
- Sync management
- Profile dan account settings

**Kapan Tab Ini Aktif:**
- Initial setup dan onboarding
- Periodic customization needs
- Learning dan spiritual education
- Technical issues atau sync problems

## **Visual Hierarchy & Design**

### **Active State (Tab Terpilih):**
```
🌙 Today
[Active teal color, bold text, filled icon]
```

### **Inactive State (Tab Tidak Terpilih):**
```
📅 Calendar
[Gray color, regular text, outline icon]
```

### **Notification Badge:**
```
📊 Progress (•)
[Small red dot untuk new insights atau achievements]
```

## **Navigation Behavior**

### **Tab Switching Animation:**
- **Smooth Transition:** 300ms ease-out untuk pergantian content
- **Icon Animation:** Subtle scale effect saat tap
- **Content Persistence:** Maintain scroll position dan state
- **Haptic Feedback:** Light impact untuk confirmation

### **Tab State Management:**
- **Remember Position:** Setiap tab ingat last position
- **Smart Refresh:** Auto-refresh data saat switch ke tab
- **Background Updates:** Update content di background
- **Cache Management:** Efficient memory usage

## **Tab Priorities & Usage Scenarios**

### **Daily Usage Pattern:**
1. **Morning:** Today → Planning (quick check besok)
2. **Midday:** Today (status check saat puasa)
3. **Evening:** Progress → Planning (review & plan besok)
4. **Weekly:** Calendar (strategic view) → More (learning)

### **User Journey Berdasarkan Experience Level:**

**Pemula (New User):**
- **Week 1-2:** Today (80%), More (15%), Calendar (5%)
- **Month 1-2:** Today (60%), Planning (20%), Calendar (15%), More (5%)
- **Month 3+:** Balanced usage semua tab

**Advanced User:**
- **Planning (30%):** Strategic approach
- **Today (25%):** Daily execution
- **Calendar (20%):** Long-term view
- **Progress (15%):** Analytics lover
- **More (10%):** Customization & learning

## **Smart Badge System**

### **Today Tab Badges:**
- **🔴 Urgent:** Emergency break needed
- **🟠 Warning:** Potential conflict detected
- **🟢 Ready:** Perfect condition untuk puasa
- **⚪ Neutral:** Regular day, no special status

### **Planning Tab Badges:**
- **Numbers (1-9):** Jumlah unplanned high-priority opportunities
- **⭐ Special:** Ada event khusus (Ayyamul Bidh, Asyura) dalam 3 hari

### **Progress Tab Badges:**
- **🎉 Achievement:** New milestone achieved
- **📈 Insight:** New pattern atau recommendation available
- **⚠️ Alert:** Deadline approaching untuk qadha/nazar

### **Calendar Tab Badges:**
- **🔄 Sync:** New data available from Islamic calendar sources
- **❗ Conflict:** New external calendar conflict detected

## **Contextual Tab Highlighting**

### **Berdasarkan Waktu:**
- **Subuh-Dhuhr:** Today tab lebih prominent (decision time)
- **Ashar-Maghrib:** Today tab dengan countdown emphasis
- **Maghrib-Isya:** Planning tab highlighted (planning besok)
- **Malam:** Progress tab untuk reflection

### **Berdasarkan Status:**
- **Sedang Puasa:** Today tab dengan live tracking
- **Rest Day:** Planning tab untuk next opportunity
- **Weekend:** Calendar tab untuk weekly overview
- **Bulan Khusus:** Semua tab dengan special theming

## **Accessibility & Usability**

### **Touch Target:**
- **Minimum Size:** 44pt height untuk easy thumb access
- **Active Area:** Full tab width untuk generous tap area
- **Safe Zones:** Avoid conflict dengan home indicator iOS

### **Visual Accessibility:**
- **High Contrast:** Clear distinction active vs inactive
- **Color Blind Support:** Tidak hanya rely pada color
- **Text Size:** Support dynamic type sizing
- **Icon Clarity:** Recognizable icons dengan text labels

### **Navigation Shortcuts:**
- **Long Press:** Quick actions dari tab icon
- **Swipe Gestures:** Horizontal swipe antar tab
- **Voice Control:** Accessibility command support
- **Keyboard Navigation:** External keyboard support

## **Tab Customization Options**

### **Advanced User Options:**
- **Tab Reordering:** Drag & drop untuk personal preference
- **Tab Hiding:** Hide tabs yang jarang digunakan
- **Quick Actions:** Customize long-press actions
- **Badge Preferences:** Control badge sensitivity

### **Beginner Mode:**
- **Guided Flow:** Highlight which tab to use when
- **Tutorial Overlays:** Contextual help untuk tab functions
- **Progress Indicators:** Show completion di each tab
- **Simplified View:** Hide advanced features initially

## **Emergency & Special States**

### **Emergency Mode (Active Fast Break):**
Bottom navigation berubah jadi emergency-focused:
```
[🆘 Break] [🤲 Dua] [📞 Help] [📋 Log] [⚙️ More]
```

### **Ramadan Mode:**
Special navigation dengan Ramadan-specific features:
```
[🌙 Today] [📅 Ramadan] [🎯 Goals] [📊 Track] [🕌 More]
```

### **Offline Mode:**
Visual indicator untuk offline capabilities:
```
[🌙 Today] [📅 Calendar •] [🎯 Planning ⚠️] [📊 Progress] [⚙️ More]
```
- **• (dot):** Fully available offline
- **⚠️ (warning):** Limited functionality offline

**Hasil Akhir:** Bottom navigation yang intuitif, efficient, dan adaptive - memberikan akses mudah ke semua core functions sambil maintain simplicity dan focus pada journey puasa yang meaningful.