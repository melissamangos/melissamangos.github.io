// Type 1 SLI data: hotfix commits as a share of all commits across a trailing
// 8-week (56-day) window, evaluated at each release. Computed from the raw
// per-release counts in "FE Bugs per release.xlsx"; the first point is the first
// full 8-week window. Points flagged slo are windows at or under the 2% target.
const sliData = [
  { date: 'Mar 15, 2023', rate: 12.6 },
  { date: 'Mar 29, 2023', rate: 11.2 },
  { date: 'Apr 12, 2023', rate: 8.3 },
  { date: 'Apr 26, 2023', rate: 8.3 },
  { date: 'May 10, 2023', rate: 7.2 },
  { date: 'May 24, 2023', rate: 10.2 },
  { date: 'Jun 7, 2023', rate: 11.6 },
  { date: 'Jun 21, 2023', rate: 11.3 },
  { date: 'Jul 5, 2023', rate: 10.9 },
  { date: 'Jul 19, 2023', rate: 8.3 },
  { date: 'Aug 2, 2023', rate: 7.0 },
  { date: 'Aug 16, 2023', rate: 5.1 },
  { date: 'Aug 30, 2023', rate: 4.1 },
  { date: 'Sep 13, 2023', rate: 3.6 },
  { date: 'Sep 27, 2023', rate: 4.1 },
  { date: 'Oct 12, 2023', rate: 2.8 },
  { date: 'Oct 25, 2023', rate: 4.8 },
  { date: 'Nov 8, 2023', rate: 5.0 },
  { date: 'Nov 23, 2023', rate: 4.6 },
  { date: 'Nov 29, 2023', rate: 4.5 },
  { date: 'Dec 6, 2023', rate: 5.8 },
  { date: 'Dec 13, 2023', rate: 7.0 },
  { date: 'Jan 4, 2024', rate: 6.4 },
  { date: 'Jan 10, 2024', rate: 6.5 },
  { date: 'Jan 17, 2024', rate: 7.0 },
  { date: 'Jan 24, 2024', rate: 6.5 },
  { date: 'Jan 31, 2024', rate: 4.9 },
  { date: 'Feb 7, 2024', rate: 4.0 },
  { date: 'Feb 15, 2024', rate: 5.0 },
  { date: 'Feb 21, 2024', rate: 4.4 },
  { date: 'Feb 28, 2024', rate: 4.1 },
  { date: 'Mar 6, 2024', rate: 4.1 },
  { date: 'Mar 13, 2024', rate: 3.8 },
  { date: 'Mar 20, 2024', rate: 4.7 },
  { date: 'Mar 27, 2024', rate: 5.2 },
  { date: 'Apr 3, 2024', rate: 5.5 },
  { date: 'Apr 10, 2024', rate: 4.9 },
  { date: 'Apr 17, 2024', rate: 4.8 },
  { date: 'Apr 23, 2024', rate: 4.8 },
  { date: 'Apr 25, 2024', rate: 5.0 },
  { date: 'Apr 30, 2024', rate: 4.9 },
  { date: 'May 2, 2024', rate: 4.2 },
  { date: 'May 7, 2024', rate: 4.7 },
  { date: 'May 9, 2024', rate: 4.5 },
  { date: 'May 14, 2024', rate: 4.7 },
  { date: 'May 16, 2024', rate: 4.8 },
  { date: 'May 21, 2024', rate: 5.1 },
  { date: 'May 22, 2024', rate: 4.4 },
  { date: 'May 28, 2024', rate: 4.1 },
  { date: 'May 30, 2024', rate: 4.3 },
  { date: 'Jun 4, 2024', rate: 4.0 },
  { date: 'Jun 6, 2024', rate: 4.9 },
  { date: 'Jun 11, 2024', rate: 4.7 },
  { date: 'Jun 13, 2024', rate: 4.2 },
  { date: 'Jun 18, 2024', rate: 3.7 },
  { date: 'Jun 20, 2024', rate: 4.3 },
  { date: 'Jun 25, 2024', rate: 4.0 },
  { date: 'Jun 26, 2024', rate: 4.0 },
  { date: 'Jul 2, 2024', rate: 3.4 },
  { date: 'Jul 4, 2024', rate: 2.8 },
  { date: 'Jul 9, 2024', rate: 2.3 },
  { date: 'Jul 11, 2024', rate: 1.7, slo: true },
  { date: 'Jul 16, 2024', rate: 1.1, slo: true },
  { date: 'Jul 18, 2024', rate: 1.6, slo: true },
  { date: 'Jul 23, 2024', rate: 2.2 },
  { date: 'Jul 25, 2024', rate: 2.8 },
  { date: 'Jul 30, 2024', rate: 2.8 },
  { date: 'Jul 31, 2024', rate: 2.7 },
  { date: 'Aug 6, 2024', rate: 2.8 },
  { date: 'Aug 8, 2024', rate: 2.8 },
  { date: 'Aug 13, 2024', rate: 3.0 },
  { date: 'Aug 14, 2024', rate: 2.8 },
  { date: 'Aug 20, 2024', rate: 2.4 },
  { date: 'Aug 22, 2024', rate: 2.4 },
  { date: 'Aug 27, 2024', rate: 2.4 },
  { date: 'Aug 29, 2024', rate: 2.4 },
  { date: 'Sep 3, 2024', rate: 2.5 },
  { date: 'Sep 5, 2024', rate: 3.0 },
  { date: 'Sep 10, 2024', rate: 3.6 },
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

      const pad = (scales.x.getPixelForValue(1) - scales.x.getPixelForValue(0)) / 2;
      const x1 = scales.x.getPixelForValue(sloStart) - pad;
      const x2 = scales.x.getPixelForValue(sloEnd) + pad;
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
              const sloNote = d.slo ? ' ✓ at or under 2% target' : '';
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
            callback: function (val) { return this.getLabelForValue(val).replace(/ \d+,/, ''); },
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