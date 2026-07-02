// Real data: Type 1 SLI (hotfix rate) across Ratehub front-end release
// branches, shown as an 8-week rolling average — the actual methodology
// used for the SLI/SLO success criteria. Spans the genuine peak through
// the release that first met the sustained low-defect success condition,
// extended to show the rate holding steady afterward.
const sliData = [
  { date: 'Mar 2023', release: '2.83', rate: 12.3 },
  { date: 'Apr 2023', release: '2.87', rate: 9.3 },
  { date: 'Jun 2023', release: '2.91', rate: 11.9 },
  { date: 'Aug 2023', release: '2.95', rate: 6.7 },
  { date: 'Oct 2023', release: '2.99', rate: 2.6 },
  { date: 'Nov 2023', release: '2.103', rate: 4.5 },
  { date: 'Jan 2024', release: '2.107', rate: 6.9 },
  { date: 'Feb 2024', release: '2.111', rate: 4.4 },
  { date: 'Mar 2024', release: '2.115', rate: 4.1 },
  { date: 'Apr 2024', release: '2.119', rate: 4.5 },
  { date: 'Apr 2024', release: '2.123', rate: 4.7 },
  { date: 'May 2024', release: '2.127', rate: 4.1 },
  { date: 'May 2024', release: '2.131', rate: 5.1 },
  { date: 'Jun 2024', release: '2.135', rate: 5.1 },
  { date: 'Jun 2024', release: '2.139', rate: 4.5 },
  { date: 'Jul 2024', release: '2.143', rate: 3.9 },
  { date: 'Jul 18, 2024', release: '2.147', rate: 1.8 },
  { date: 'Jul 30, 2024', release: '2.150', rate: 3.1 },
  { date: 'Aug 8, 2024', release: '2.153', rate: 3.2 },
  { date: 'Aug 20, 2024', release: '2.156', rate: 2.6 },
  { date: 'Aug 29, 2024', release: '2.159', rate: 2.6 },
  { date: 'Sep 10, 2024', release: '2.162', rate: 3.7 },
];

function initChart() {
  const canvas = document.getElementById('sliChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 280);
  gradient.addColorStop(0, 'rgba(36, 107, 107, 0.25)');
  gradient.addColorStop(1, 'rgba(36, 107, 107, 0.02)');

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
          pointBackgroundColor: '#00478F',
          pointBorderColor: '#FAF9F6',
          pointBorderWidth: 1.5,
          pointRadius: 3.5,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.35,
          order: 1,
        },
        {
          label: 'Target (2% error budget)',
          data: sliData.map(() => 2),
          borderColor: '#9A9890',
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
            usePointStyle: false,
          }
        },
        tooltip: {
          backgroundColor: '#1B2E2E',
          padding: 10,
          titleFont: { family: 'Montserrat', weight: '600', size: 13 },
          bodyFont: { family: 'Open Sans', size: 12 },
          filter: (item) => item.datasetIndex === 0,
          callbacks: {
            label: (item) => `${item.parsed.y}% hotfix rate · release ${sliData[item.dataIndex].release}`
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
          grid: { color: 'rgba(43,43,43,0.06)' },
          ticks: {
            font: { family: 'Open Sans', size: 11 },
            color: '#5B5B58',
            callback: (val) => val + '%'
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
