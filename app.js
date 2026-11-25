(function () {
  const page = document.body.dataset.page;
  document.querySelectorAll("[data-reveal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.reveal);
      if (!target) return;
      const open = target.hidden;
      target.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      const counter = document.querySelector("[data-counter]");
      if (counter) {
        const n = document.querySelectorAll('.message-btn[aria-expanded="true"]').length;
        counter.textContent = n + " of 5 hidden thoughts revealed";
      }
    });
  });
  document.querySelectorAll("[data-draft]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.draft);
      if (!target) return;
      const open = !target.classList.contains("is-open");
      target.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "CLOSE TRANSCRIPT −" : "REVEAL DELETED WORDS +";
    });
  });
  const descriptions = {
    awkward: [
      "The fear of breaking the pattern",
      "You may have spent years speaking through practical questions. A direct expression of affection can feel strange—not because it is insincere, but because it is unfamiliar."
    ],
    burden: [
      "Not wanting to add another worry",
      "Sometimes silence is meant as protection: the father says he is fine so the child does not worry; the child says the same so the father can rest. Both people may believe they are taking care of the other."
    ],
    language: [
      "A vocabulary built around everyday tasks",
      "“Have you eaten?” or “Are you home?” can carry care. But those familiar questions cannot always express everything that someone wants to ask."
    ],
    timing: [
      "Waiting for the perfect moment",
      "One person drafts a message, deletes it, and thinks they will try tomorrow. The delay can become its own habit."
    ]
  };
  document.querySelectorAll("[data-reason]").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-reason]").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const d = descriptions[btn.dataset.reason];
      document.querySelector("#reason-title").textContent = d[0];
      document.querySelector("#reason-copy").textContent = d[1];
      document.querySelector("#reason-result").focus();
    })
  );
  const note = document.querySelector("#private-note");
  if (note) {
    const status = document.querySelector("#note-status");
    document.querySelector("#hold-note").addEventListener("click", () => {
      status.textContent = note.value.trim()
        ? "Your words are here. They have not been sent or saved."
        : "Write something first. Nothing will be sent.";
    });
    document.querySelector("#erase-note").addEventListener("click", () => {
      note.value = "";
      status.textContent = "Draft cleared. You can begin again.";
      note.focus();
    });
    window.addEventListener("beforeunload", () => {
      note.value = "";
    });
  }
})();