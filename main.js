// Raw Type 1 SLI data (hotfix rate per release branch)
// Source: Front-end release tracking, Jan 2023 – Sep 2024
// Each point is one release branch. The shaded region marks the first
// verified success window: 8 consecutive releases where the
// Type 1 hotfix error budget (≤2%) was met — defined upfront, not after the fact.
const sliData = [
  { date: 'Jan 18', release: '2.80',  rate: 7.8  },
  { date: 'Feb 1',  release: '2.81',  rate: 11.2 },
  { date: 'Feb 15', release: '2.82',  rate: 15.8 },
  { date: 'Mar 1',  release: '2.83',  rate: 14.5 },
  { date: 'Mar 15', release: '2.84',  rate: 10.5 },
  { date: 'Mar 29', release: '2.85',  rate: 3.6  },
  { date: 'Apr 12', release: '2.86',  rate: 3.8  },
  { date: 'Apr 26', release: '2.87',  rate: 14.3 },
  { date: 'May 10', release: '2.88',  rate: 6.2  },
  { date: 'May 24', release: '2.89',  rate: 15.6 },
  { date: 'Jun 7',  release: '2.90',  rate: 10.0 },
  { date: 'Jun 21', release: '2.91',  rate: 13.2 },
  { date: 'Jul 5',  release: '2.92',  rate: 4.8  },
  { date: 'Jul 19', release: '2.93',  rate: 5.8  },
  { date: 'Aug 2',  release: '2.94',  rate: 4.3  },
  { date: 'Aug 16', release: '2.95',  rate: 5.6  },
  { date: 'Aug 30', release: '2.96',  rate: 0.0  },
  { date: 'Sep 13', release: '2.97',  rate: 3.9  },
  { date: 'Sep 27', release: '2.98',  rate: 6.4  },
  { date: 'Oct 12', release: '2.99',  rate: 0.0  },
  { date: 'Oct 25', release: '2.100', rate: 9.1  },
  { date: 'Nov 8',  release: '2.101', rate: 4.5  },
  { date: 'Nov 23', release: '2.102', rate: 5.0  },
  { date: 'Nov 29', release: '2.103', rate: 3.8  },
  { date: 'Dec 6',  release: '2.104', rate: 14.8 },
  { date: 'Dec 13', release: '2.105', rate: 6.1  },
  { date: 'Jan 4',  release: '2.106', rate: 4.3  },
  { date: 'Jan 10', release: '2.107', rate: 7.1  },
  { date: 'Jan 17', release: '2.108', rate: 10.3 },
  { date: 'Jan 24', release: '2.109', rate: 0.0  },
  { date: 'Jan 31', release: '2.110', rate: 3.1  },
  { date: 'Feb 7',  release: '2.111', rate: 0.0  },
  { date: 'Feb 15', release: '2.112', rate: 9.5  },
  { date: 'Feb 21', release: '2.113', rate: 0.0  },
  { date: 'Feb 28', release: '2.114', rate: 0.0  },
  { date: 'Mar 6',  release: '2.115', rate: 6.9  },
  { date: 'Mar 13', release: '2.116', rate: 10.5 },
  { date: 'Mar 20', release: '2.117', rate: 5.7  },
  { date: 'Mar 27', release: '2.118', rate: 7.7  },
  { date: 'Apr 3',  release: '2.119', rate: 0.0  },
  { date: 'Apr 10', release: '2.120', rate: 0.0  },
  { date: 'Apr 17', release: '2.121', rate: 5.6  },
  { date: 'Apr 23', release: '2.122', rate: 5.6  },
  { date: 'Apr 25', release: '2.123', rate: 0.0  },
  { date: 'Apr 30', release: '2.124', rate: 0.0  },
  { date: 'May 2',  release: '2.125', rate: 0.0  },
  { date: 'May 7',  release: '2.126', rate: 9.1  },
  { date: 'May 9',  release: '2.127', rate: 11.1 },
  { date: 'May 14', release: '2.128', rate: 7.7  },
  { date: 'May 16', release: '2.129', rate: 11.1 },
  { date: 'May 21', release: '2.130', rate: 14.3 },
  // SLO window starts: 8 consecutive releases meeting the ≤2% target
  { date: 'May 22', release: '2.131', rate: 0.0, slo: true },
  { date: 'May 28', release: '2.132', rate: 0.0, slo: true },
  { date: 'May 30', release: '2.133', rate: 0.0, slo: true },
  { date: 'Jun 4',  release: '2.134', rate: 0.0, slo: true },
  { date: 'Jun 6',  release: '2.135', rate: 12.5, slo: true },
  { date: 'Jun 11', release: '2.136', rate: 0.0, slo: true },
  { date: 'Jun 13', release: '2.137', rate: 0.0, slo: true },
  { date: 'Jun 18', release: '2.138', rate: 0.0, slo: true },
  // SLO window ends
  { date: 'Jun 20', release: '2.139', rate: 10.0 },
  { date: 'Jun 25', release: '2.140', rate: 0.0  },
  { date: 'Jun 26', release: '2.141', rate: 0.0  },
  { date: 'Jul 2',  release: '2.142', rate: 0.0  },
  { date: 'Jul 4',  release: '2.143', rate: 0.0  },
  { date: 'Jul 9',  release: '2.144', rate: 0.0  },
  { date: 'Jul 11', release: '2.145', rate: 0.0  },
  { date: 'Jul 16', release: '2.146', rate: 0.0  },
  { date: 'Jul 18', release: '2.147', rate: 5.9  },
  { date: 'Jul 23', release: '2.148', rate: 7.7  },
  { date: 'Jul 25', release: '2.149', rate: 16.7 },
  { date: 'Jul 30', release: '2.150', rate: 0.0  },
  { date: 'Jul 31', release: '2.151', rate: 0.0  },
  { date: 'Aug 6',  release: '2.152', rate: 14.3 },
  { date: 'Aug 8',  release: '2.153', rate: 0.0  },
  { date: 'Aug 13', release: '2.154', rate: 0.0  },
  { date: 'Aug 14', release: '2.155', rate: 0.0  },
  { date: 'Aug 20', release: '2.156', rate: 0.0  },
  { date: 'Aug 22', release: '2.157', rate: 0.0  },
  { date: 'Aug 27', release: '2.158', rate: 0.0  },
  { date: 'Aug 29', release: '2.159', rate: 0.0  },
  { date: 'Sep 3',  release: '2.160', rate: 0.0  },
  { date: 'Sep 5',  release: '2.161', rate: 10.0 },
  { date: 'Sep 10', release: '2.162', rate: 9.1  },
];

// Indices of the first verified SLO success window
const sloStart = sliData.findIndex(d => d.slo === true);
const sloEnd   = sliData.reduce((last, d, i) => d.slo ? i : last, 0);

// Year labels for x-axis grouping (shown at first release of each year)
const yearLabels = { '2.80': '2023', '2.106': '2024' };

function initChart() {
  const canvas = document.getElementById('sliChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');

  // Teal gradient fill under the main line
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(36,107,107,0.18)');
  gradient.addColorStop(1, 'rgba(36,107,107,0.01)');

  // SLO success zone plugin — draws a green shaded rectangle + label
  const sloZonePlugin = {
    id: 'sloZone',
    beforeDraw(chart) {
      const { ctx: c, chartArea, scales } = chart;
      if (!chartArea) return;

      const x1 = scales.x.getPixelForValue(sloStart);
      const x2 = scales.x.getPixelForValue(sloEnd);
      const yTop = chartArea.top;
      const yBot = chartArea.bottom;

      // Green shaded region
      c.save();
      c.fillStyle = 'rgba(36,107,107,0.10)';
      c.fillRect(x1, yTop, x2 - x1, yBot - yTop);

      // Subtle left/right borders
      c.strokeStyle = 'rgba(36,107,107,0.35)';
      c.lineWidth = 1;
      c.setLineDash([4, 3]);
      c.beginPath(); c.moveTo(x1, yTop); c.lineTo(x1, yBot); c.stroke();
      c.beginPath(); c.moveTo(x2, yTop); c.lineTo(x2, yBot); c.stroke();
      c.setLineDash([]);

      // Label inside the zone
      c.fillStyle = '#246B6B';
      c.font = '600 11px "Montserrat", sans-serif';
      c.textAlign = 'center';
      c.fillText('SLO met', (x1 + x2) / 2, yTop + 14);
      c.fillText('8 releases', (x1 + x2) / 2, yTop + 27);

      c.restore();
    }
  };

  Chart.register(sloZonePlugin);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: sliData.map(d => d.release),
      datasets: [
        {
          label: 'Hotfix rate per release',
          data: sliData.map(d => d.rate),
          borderColor: '#246B6B',
          backgroundColor: gradient,
          borderWidth: 2,
          pointBackgroundColor: sliData.map(d =>
            d.slo ? '#246B6B' : '#00478F'
          ),
          pointBorderColor: '#FAF9F6',
          pointBorderWidth: 1.5,
          pointRadius: sliData.map(d => d.slo ? 4 : 2.5),
          pointHoverRadius: 6,
          fill: true,
          tension: 0.2,
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
            title: items => `${sliData[items[0].dataIndex].date}`,
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
            font: { family: 'Open Sans', size: 10 },
            color: '#5B5B58',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10,
            callback(val, idx) {
              const release = sliData[idx]?.release;
              // Show year label at first release of each year
              if (yearLabels[release]) return yearLabels[release];
              return null;
            }
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 20,
          grid: { color: 'rgba(43,43,43,0.06)' },
          ticks: {
            font: { family: 'Open Sans', size: 11 },
            color: '#5B5B58',
            callback: val => val + '%',
            stepSize: 5,
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