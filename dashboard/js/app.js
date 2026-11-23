// JavaScript Controller - Fleet Safety Guardian Dashboard

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Ikon Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Jam Digital Real-Time WIB
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}:${seconds} WIB`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 3. Konfigurasi Grafik Tren Kantuk & Alarm (Chart.js)
  const ctx = document.getElementById('drowsinessChart');
  if (ctx) {
    const chartContext = ctx.getContext('2d');

    // Gradien Biru Lembut Transparan di Bawah Garis
    const gradient = chartContext.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
        datasets: [
          {
            label: 'Indeks Kantuk Pengemudi',
            data: [0.04, 0.18, 0.08, 0.06, 0.16, 0.22, 0.07, 0.05, 0.09],
            borderColor: '#2563eb',
            borderWidth: 2.5,
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: function(context) {
              const val = context.dataset.data[context.dataIndex];
              return val >= 0.15 ? '#ef4444' : '#2563eb';
            },
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: function(context) {
              const val = context.dataset.data[context.dataIndex];
              return val >= 0.15 ? 6 : 3;
            },
            pointHoverRadius: 8
          },
          {
            label: 'Ambang Batas Waspada (0.15)',
            data: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
            borderColor: '#f59e0b',
            borderWidth: 1.5,
            borderDash: [6, 4],
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  const val = context.parsed.y;
                  let note = val >= 0.15 ? ' [ALARM AKTIF]' : ' [Normal]';
                  return ` Indeks: ${val}${note}`;
                }
                return ` Ambang Batas: 0.15`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#f1f5f9' },
            ticks: { color: '#64748b', font: { size: 11 } }
          },
          y: {
            min: 0,
            max: 0.30,
            grid: { color: '#f1f5f9' },
            ticks: {
              color: '#64748b',
              font: { size: 11 },
              callback: function(value) {
                return value.toFixed(2);
              }
            }
          }
        }
      }
    });
  }

  // 4. Unduh Log CSV Dummy
  const btnExport = document.getElementById('btnExportCsv');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Waktu,Unit,Tipe,Level,Durasi_Detik,Status\n"
        + "2026-11-23 08:15:00,Unit-01,microsleep,2,1.8,Alarm_Aktif\n"
        + "2026-11-23 08:02:00,Unit-01,yawn,1,1.6,Peringatan_Lembut\n"
        + "2026-11-23 07:31:00,Unit-01,face_lost,0,3.2,Wajah_Hilang\n"
        + "2026-11-23 06:45:00,Unit-01,microsleep,2,2.1,Alarm_Aktif\n";
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "log_kejadian_microsleep_unit01.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});

// 5. Fungsi Modal Pop-up Detail
window.showDetail = function(title, body) {
  const modal = document.getElementById('detailModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modal && modalTitle && modalBody) {
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeModal = function() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

