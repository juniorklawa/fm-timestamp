setTimeout(function () {
  const lessonGroups = document.querySelectorAll(".lesson-group");
  const playbackRate = parseFloat(document.querySelector("#vjs-playback-rate-value-label-vjs_video_3_component_341").textContent) || 1;

  lessonGroups.forEach((group) => {
    let totalTime = 0;
    let nextSibling = group.nextElementSibling;

    const processSibling = (sibling) => {
      if (!sibling || sibling.classList.contains("lesson-group")) {
        return;
      }
      const timestampElement = sibling.querySelector(".timestamp");
      if (timestampElement) {
        const timestamp = timestampElement.textContent;
        const times = timestamp.split(" - ").map((time) => {
          const [hrs, mins, secs] = time.split(":").map(parseFloat);
          return hrs * 3600 + mins * 60 + secs;
        });
        if (times.length === 2) {
          totalTime += (times[1] - times[0]) / playbackRate;
        }
      }
      processSibling(sibling.nextElementSibling);
    };

    processSibling(nextSibling);

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