let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// ---------- CHARTS ---------- 
// BAR CHART 
const barChartOptions = {
  series: [
    {
      data: [10, 8, 6, 4, 2],
      name: 'Products',
    },
  ],
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
  xaxis: {
    categories: ['Earrings', 'Rings', 'Necklaces', 'Bracelets', 'Cuff Links'],
    title: {
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      show: true,
      color: '#55596e',
    },
    axisTicks: {
      show: true,
      color: '#55596e',
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Products Sold',
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
};
const barChart = new ApexCharts(document.querySelector('#bar-chart'), barChartOptions);
barChart.render();

// AREA CHART

const areaChartOptions = {
  series: [
    {
      name: 'Sales employee 1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales employee 2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#00ab57', '#d50000'],
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Sales employee 1',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: 'Sales employee 2',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};
const areaChart = new ApexCharts(document.querySelector('#area-chart'), areaChartOptions);
areaChart.render();
// Additional code for dwell time calculation functionality
// Variables to store the drawn rectangle coordinates
let selectionRect = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
let isDrawing = false;
const canvas = document.getElementById('selectionCanvas');
const context = canvas.getContext('2d');
const storeLayoutImage = new Image();
storeLayoutImage.onload = function() {
  context.drawImage(storeLayoutImage, 0, 0, canvas.width, canvas.height);
};
storeLayoutImage.src = 'ActualBaseImage.png'; // empty store image 

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('mousemove', handleMouseMove, false);

function handleMouseDown(event) {
  const rect = canvas.getBoundingClientRect();
  selectionRect.startX = event.clientX - rect.left;
  selectionRect.startY = event.clientY - rect.top;
  isDrawing = true;
}

function handleMouseUp(event) {
  if (isDrawing) {
    isDrawing = false;
    askForConfirmation();
  }
}

function handleMouseMove(event) {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Ensure all coordinates are positive

    selectionRect.endX = mouseX;
    selectionRect.endY = mouseY;
    selectionRect.width = Math.abs(selectionRect.endX - selectionRect.startX);
    selectionRect.height = Math.abs(selectionRect.endY - selectionRect.startY);
    selectionRect.startX = Math.min(selectionRect.startX, selectionRect.endX);
    selectionRect.startY = Math.min(selectionRect.startY, selectionRect.endY);

    // Clear and redraw canvas

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(storeLayoutImage, 0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.rect(selectionRect.startX, selectionRect.startY, selectionRect.width, selectionRect.height);
    context.strokeStyle = 'red';


    // Makes the rectangle visible 

    context.stroke();
  }
}
// button event listeners
function askForConfirmation() {
  document.getElementById('confirmButton').style.display = 'block';
  document.getElementById('cancelButton').style.display = 'block';
}

document.getElementById('confirmButton').addEventListener('click', function() {
  this.style.display = 'none';
  document.getElementById('cancelButton').style.display = 'none';
  const rect = {
    start_x: selectionRect.startX, start_y: selectionRect.startY, width: selectionRect.width, height: selectionRect.height
  };
  calculateDwellTime(rect);
});
document.getElementById('cancelButton').addEventListener('click',
  function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('dwell-time-value').textContent = 'Not Calculated Yet';
    this.style.display = 'none';
    document.getElementById('confirmButton').style.display = 'block';
  });

function calculateDwellTime(rect) {
  const url = 'http://51.21.3.214:5000/calculate_dwell_time';
  fetch(url, {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ rectangle: rect })
  }).then(response => { if (!response.ok) { throw new Error('Network response was not ok'); } return response.json(); }).then(data => { if (data.dwell_time !== undefined) { displayDwellTime(data.dwell_time); } else { console.error('Error calculating dwell time:', data.error); } }).catch(error => { console.error('Error:', error); });
}

function displayDwellTime(dwellTime) {
  document.getElementById('dwell-time-value').textContent = `${dwellTime} seconds`;
}