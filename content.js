setTimeout(function () {
  const lessonGroups = document.querySelectorAll(".lesson-group");

  lessonGroups.forEach((group) => {
    let totalTime = 0;
    let nextSibling = group.nextElementSibling;
    while (nextSibling && !nextSibling.classList.contains("lesson-group")) {
      const timestampElement = nextSibling.querySelector(".timestamp");
      if (timestampElement) {
        const timestamp = timestampElement.textContent;
        const times = timestamp.split(" - ").map((time) => {
          const [hrs, mins, secs] = time.split(":").map(parseFloat);
          return hrs * 3600 + mins * 60 + secs;
        });
        if (times.length === 2) {
          totalTime += times[1] - times[0];
        }
      }
      nextSibling = nextSibling.nextElementSibling;
    }

    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    let durationText = "";

    if (hours > 0) {
      durationText += `${hours}h`;
    }
    if (minutes > 0 || hours > 0) {
      if (durationText.length > 0) {
        durationText += " ";
      }
      durationText += `${minutes}min`;
    }

    group.textContent += ` - ${durationText}`;
  });
}, 2000);
