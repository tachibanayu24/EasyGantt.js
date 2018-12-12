// 開始する日付を入力してください
let startDay = {
  year: 2018,
  month: 12,
  day: 17
}

// 始業時間と就業時間を入力してください(30分単位で入力してください)
let openingTime = 900;
let closingTime = 1730;

// 始業時間と就業時間から、30分区切りでhh:mmというフォーマットに変換する
const createTimeScale = (open, close) => {
  openMin = convertTimesToMins(open);
  closeMin = convertTimesToMins(close);
  workingMin = closeMin - openMin;
  timeScale = [];
  scaleDiv =  workingMin / 30;
  for(let i=0; i <= scaleDiv; i++) {
    timeScale[i] = String((openMin + (i * 30))/60);
    if(timeScale[i].slice(-2) === ".5") {
      timeScale[i] = timeScale[i].replace(".5", ":30");
    } else {
      timeScale[i] = timeScale[i] + ":00";
    }
  }
}

const scaleDOM = (i) => {
  let scale = document.querySelectorAll(".scale");
  scale[i].insertAdjacentHTML('beforeend', '<div class="hr">')
  for(let j=0; j<timeScale.length; j++) {
    scale[i].insertAdjacentHTML('beforeend',`
      <section>${timeScale[j]}</section></div>
    `);
  }
}

const dateDOM = (i) => {
  let taskDay = new Date(startDay.year, startDay.month - 1, startDay.day + i);
  let m = taskDay.getMonth() + 1;
  let d = taskDay.getDate();
  let w = taskDay.getDay();
  let weekNames = ['日', '月', '火', '水', '木', '金', '土'];
  document.getElementById("date" + [i]).innerText = `${m}/${d}(${weekNames[w%7]})`;
}

const convertTimesToMins = (time) => {
  let hour = parseInt(String(time).slice(0, -2));
  let min = parseInt(String(time).slice(-2));
  let sumMins = hour * 60 + min;
  return sumMins;
}

const bubbleDOM = (i, j, start, duration, element) => {
  element.insertAdjacentHTML('beforeend', `
  <li><div class="${task[i][j].category}">
    <span class="bubble" style="margin-left: ${(start - (openingTime/100) * 60) * 2}px; width: ${duration * 2}px;"></span>
      ${bubbleData(i, j)}
  </div></li>
`);
}

const bubbleData = (i, j) => {
  if(task[i][j].category !== "milestone") {
    data = `<span class="time">
              ${String(task[i][j].startTime).slice(0, -2)}:${String(task[i][j].startTime).slice(-2)}
              -${String(task[i][j].endTime).slice(0, -2)}:${String(task[i][j].endTime).slice(-2)}
            </span>
            <span class="bubble-span">${task[i][j].name}</span>`;
  } else {
    data = `<span class="time milestone-span">
              ${String(task[i][j].startTime).slice(0, -2)}:${String(task[i][j].startTime).slice(-2)}<br>${task[i][j].name}
            </span>`;
  }
  return data
}

window.onload = () => {
  createTimeScale(openingTime, closingTime);

  for(let i=0; i < Object.keys(task).length; i++) {
    let contentObj = document.getElementById("chart-wrapper");
    let chartElement = document.createElement('div');
    chartElement.className = 'chart';
    contentObj.appendChild(chartElement);
    let chartArea = document.querySelectorAll(".chart");
      chartArea[i].innerHTML = `
      <span id="date${i}"></span>
      <div class="easy-gantt">
        <div class="scale"></div>
        <ul class="data" id="task${i}"></ul>
      </div>
      `;
  }

  let startTimeToMins = [], endTimeToMins = [], durationTimes = [];
  for(let i=0; i < Object.keys(task).length; i++) {
    if(task[i][0]) {
      dateDOM(i);
      scaleDOM(i);
      let createBubble = document.getElementById(`task${i}`);
      startTimeToMins[i] = [], endTimeToMins[i] = [], durationTimes[i] = [];
      for(let j=0; j < Object.keys(task[i]).length; j++) {
        bubbleDOM(i, j,
          convertTimesToMins(task[i][j].startTime),
          (convertTimesToMins(task[i][j].endTime) - convertTimesToMins(task[i][j].startTime)),
          createBubble
        );
      }
    }
  }
}