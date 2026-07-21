// Type 1 SLI data (hotfix rate), shown as an 8-week rolling average —
// the actual methodology used for the SLI/SLO success criteria.
// Spans the genuine peak through the first verified success window
// and the sustained low period that followed.
const sliData = [
  { date: 'Mar 2023',     rate: 12.3 },
  { date: 'Apr 2023',     rate: 9.3  },
  { date: 'Jun 2023',     rate: 11.9 },
  { date: 'Aug 2023',     rate: 6.7  },
  { date: 'Oct 2023',     rate: 2.6  },
  { date: 'Nov 2023',     rate: 4.5  },
  { date: 'Jan 2024',     rate: 6.9  },
  { date: 'Feb 2024',     rate: 4.4  },
  { date: 'Mar 2024',     rate: 4.1  },
  { date: 'Apr 2024',     rate: 4.5  },
  { date: 'Apr 2024',     rate: 4.7  },
  { date: 'May 2024',     rate: 4.1  },
  { date: 'May 2024',     rate: 5.1  },
  { date: 'Jun 2024',     rate: 5.1  },
  { date: 'Jun 2024',     rate: 4.5  },
  { date: 'Jul 2024',     rate: 3.9  },
  { date: 'Jul 2024',     rate: 1.8, slo: true },
  { date: 'Jul 2024',     rate: 3.1, slo: true },
  { date: 'Aug 2024',     rate: 3.2, slo: true },
  { date: 'Aug 2024',     rate: 2.6, slo: true },
  { date: 'Aug 2024',     rate: 2.6, slo: true },
  { date: 'Sep 2024',     rate: 3.7, slo: true },
];

const sloStart = sliData.findIndex(d => d.slo === true);
const sloEnd   = sliData.reduce((last, d, i) => d.slo ? i : last, 0);

function initChart() {
  const canvas = document.getElementById('sliChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(36,107,107,0.22)');
  gradient.addColorStop(1, 'rgba(36,107,107,0.02)');

  const sloZonePlugin = {
    id: 'sloZone',
    beforeDraw(chart) {
      const { ctx: c, chartArea, scales } = chart;
      if (!chartArea) return;

      const x1 = scales.x.getPixelForValue(sloStart);
      const x2 = scales.x.getPixelForValue(sloEnd);
      const yTop = chartArea.top;
      const yBot = chartArea.bottom;

      c.save();
      c.fillStyle = 'rgba(36,107,107,0.09)';
      c.fillRect(x1, yTop, x2 - x1, yBot - yTop);

      c.strokeStyle = 'rgba(36,107,107,0.30)';
      c.lineWidth = 1;
      c.setLineDash([4, 3]);
      c.beginPath(); c.moveTo(x1, yTop); c.lineTo(x1, yBot); c.stroke();
      c.beginPath(); c.moveTo(x2, yTop); c.lineTo(x2, yBot); c.stroke();
      c.setLineDash([]);

      c.fillStyle = '#246B6B';
      c.font = '600 11px "Montserrat", sans-serif';
      c.textAlign = 'center';
      c.fillText('SLO met', (x1 + x2) / 2, yTop + 14);
      c.fillText('& sustained', (x1 + x2) / 2, yTop + 27);

      c.restore();
    }
  };

  Chart.register(sloZonePlugin);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: sliData.map(d => d.date),
      datasets: [
        {
          label: 'Hotfix rate (8-week rolling avg)',
          data: sliData.map(d => d.rate),
          borderColor: '#246B6B',
          backgroundColor: gradient,
          borderWidth: 2.5,
          pointBackgroundColor: sliData.map(d => d.slo ? '#246B6B' : '#00478F'),
          pointBorderColor: '#FAF9F6',
          pointBorderWidth: 1.5,
          pointRadius: sliData.map(d => d.slo ? 4 : 3.5),
          pointHoverRadius: 6,
          fill: true,
          tension: 0.35,
          order: 1,
        },
        {
          label: '2% target',
          data: sliData.map(() => 2),
          borderColor: 'rgba(90,90,85,0.45)',
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          tension: 0,
          order: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            font: { family: 'Open Sans', size: 11 },
            color: '#5B5B58',
            boxWidth: 18,
            boxHeight: 2,
            padding: 14,
          }
        },
        tooltip: {
          backgroundColor: '#1B2E2E',
          padding: 10,
          titleFont: { family: 'Montserrat', weight: '600', size: 12 },
          bodyFont: { family: 'Open Sans', size: 11 },
          filter: item => item.datasetIndex === 0,
          callbacks: {
            label: item => {
              const d = sliData[item.dataIndex];
              const sloNote = d.slo ? ' ✓ within success window' : '';
              return `${item.parsed.y}% hotfix rate${sloNote}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: 'Open Sans', size: 11 },
            color: '#5B5B58',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 6,
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 16,
          grid: { color: 'rgba(43,43,43,0.06)' },
          ticks: {
            font: { family: 'Open Sans', size: 11 },
            color: '#5B5B58',
            callback: val => val + '%',
            stepSize: 4,
          }
        }
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChart);
} else {
  initChart();
}