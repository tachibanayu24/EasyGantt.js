// 開始する日付を入力してください
let startDay = {
  year: 2018,
  month: 12,
  day: 7
}

// チャートの時間軸に表示したい時間を入力してください
let timeScale = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
                  "13:30", "14:00", "14:30", "15:00","15:30", "16:00", "16:30", "17:00", "17:30"];

// 休み時間を入力してください
let breakScale = ["12:00", "12:30"] // 12:00 - 13:00の場合

const scaleDOM = (i) => {
  let scale = document.querySelectorAll(".scale");
  scale[i].insertAdjacentHTML('beforeend', '<div class="hr">')
  for(let j=0; j<timeScale.length; j++) {
    if(breakScale.indexOf(timeScale[j]) === -1) {
      scale[i].insertAdjacentHTML('beforeend',`
        <section>${timeScale[j]}</section></div>
      `);
    } else {
      scale[i].insertAdjacentHTML('beforeend',`
        <section class="break-time">${timeScale[j]}</section></div>
      `);
    }
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
    <span class="bubble" style="margin-left: ${(start - 540) * 3}px; width: ${duration * 3}px;"></span>
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