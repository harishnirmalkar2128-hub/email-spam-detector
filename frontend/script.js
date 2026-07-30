// Expanded Array of Sample Emails 📩 (20+ Spam & 20+ Ham)
const samples = {
  spam: [
    "CONGRATULATIONS! You have won $10,000 cash. Claim your reward immediately by clicking this link!",
    "URGENT: Your bank account has been locked due to suspicious activity. Verify details now at http://fakebank.com",
    "Win a brand new iPhone 15 Pro Max! Click here to claim your free reward before it expires!",
    "FINAL NOTICE: You owe $450 in unpaid bills. Call 1-800-FAKE-NUM immediately to avoid legal charges.",
    "Earn $500/day working from home for only 2 hours! No experience required. Register now!",
    "Your Netflix subscription payment failed! Update your credit card info now to prevent account suspension.",
    "Claim your free $500 Amazon Gift Card! Only 3 left in stock. Click here to claim.",
    "Hot single ladies in your area want to chat! Click here to create your free profile now.",
    "Get instant approval for a $50,000 personal loan with zero interest! Apply today.",
    "ALERT: Someone tried to login to your Google account from Russia. Click here to secure your account.",
    "Lose 10kg in 7 days without exercise! Try our revolutionary miracle pill today.",
    "You have (1) unread message from your parcel delivery service. Click here to track your package.",
    "Exclusive Crypto Trading Bot! Guarantee 300% profit every single day. Limited slots available.",
    "Your tax refund of $1,250 is ready! Fill out this form to transfer money directly to your account.",
    "URGENT SECURITY NOTICE: Your PayPal account is restricted. Click the link to solve this issue.",
    "Congratulations! You were selected for a $100,000 Work-from-Home Data Entry job. No interview needed!",
    "Your computer is infected with 5 viruses! Download malware protection software immediately.",
    "Double your Bitcoin in 24 hours! Trusted crypto investment program with zero risk.",
    "Limited time deal! Get 90% discount on luxury designer watches. Shop now before stock ends.",
    "Your package could not be delivered due to an incorrect address. Pay $2.99 redelivery fee now."
  ],
  ham: [
    "Hi Harish, please check the attached project report and let me know if you have any feedback.",
    "Hey! Are we still meeting for lunch today at 1:30 PM?",
    "Reminder: Your scheduled dentist appointment is tomorrow at 10:00 AM. Reply YES to confirm.",
    "Can you please review the latest pull request on GitHub when you get a chance?",
    "Thanks for sending over the project slides. Everything looks good to go for tomorrow's presentation.",
    "Hi Team, please note that the weekly team sync has been rescheduled to Thursday 3 PM.",
    "Your electricity bill for the month of July is $45.20. Due date is August 5th.",
    "Here is the Wi-Fi password for the conference room: Welcome2026!",
    "Hi Harish, thanks for attending the interview. We will update you regarding the next steps soon.",
    "Don't forget to submit your lab manual assignments before Friday 5 PM.",
    "Hey, did you get a chance to test the FastAPI endpoints we built yesterday?",
    "Your order #48291 has been shipped via BlueDart and will arrive by tomorrow evening.",
    "Hi, I have shared the Google Docs folder containing all MCA 3rd semester study materials.",
    "Are you free for a quick Zoom call to discuss the Cloud Architecture assignment?",
    "Dear Customer, your bank balance statement for July 2026 is now available for download.",
    "Happy Birthday Harish! Wishing you a fantastic day ahead filled with joy and success.",
    "Please find attached the invoice for your recent AWS cloud subscription purchase.",
    "Hi all, the server maintenance is completed. System is now running smoothly.",
    "Hey brother, can you pick up some groceries on your way back home today?",
    "Your registration for the upcoming AI & Cloud Web Seminar is confirmed."
  ]
};
// Common spam triggers to extract locally
const triggerWordsList = ["win", "won", "congratulations", "urgent", "locked", "cash", "reward", "free", "claim", "iphone", "unpaid", "bills", "earn", "working from home", "failed", "subscription", "gift card", "crypto", "bitcoin", "loan", "refund", "selected"];

let lastSpamIndex = -1;
let lastHamIndex = -1;
let scanHistory = [];
let stats = { total: 0, spam: 0, ham: 0 };

function loadSample(type) {
  const sampleList = samples[type];
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * sampleList.length);
  } while (
    (type === 'spam' && randomIndex === lastSpamIndex) ||
    (type === 'ham' && randomIndex === lastHamIndex)
  );

  if (type === 'spam') lastSpamIndex = randomIndex;
  if (type === 'ham') lastHamIndex = randomIndex;

  document.getElementById("emailInput").value = sampleList[randomIndex];
}

function clearInput() {
  document.getElementById("emailInput").value = "";
  document.getElementById("resultCard").classList.add("hidden");
}

async function analyzeEmail() {
  const textInput = document.getElementById("emailInput").value.trim();
  const resultCard = document.getElementById("resultCard");
  const resultBadge = document.getElementById("resultBadge");
  const resultLabel = document.getElementById("resultLabel");
  const resultIcon = document.getElementById("resultIcon");
  const confidenceScore = document.getElementById("confidenceScore");
  const progressBar = document.getElementById("progressBar");

  if (!textInput) {
    alert("Please paste email text first! ⚠️");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textInput })
    });

    const data = await response.json();

    // Reset styles
    resultBadge.className = "status-badge";
    progressBar.className = "progress-bar-fill";
    resultCard.classList.remove("hidden");

    if (data.is_spam) {
      resultBadge.classList.add("spam");
      progressBar.classList.add("spam");
      resultIcon.className = "fa-solid fa-triangle-exclamation";
      resultLabel.innerText = "SPAM DETECTED";
      stats.spam++;
    } else {
      resultBadge.classList.add("ham");
      progressBar.classList.add("ham");
      resultIcon.className = "fa-solid fa-circle-check";
      resultLabel.innerText = "LEGITIMATE (HAM)";
      stats.ham++;
    }

    stats.total++;
    updateStatsUI();

    confidenceScore.innerText = `${data.confidence}%`;
    progressBar.style.width = `${data.confidence}%`;

    // Highlight trigger keywords
    highlightKeywords(textInput, data.is_spam);

    // Save history
    addToHistory(textInput, data.label, data.is_spam, data.confidence);

  } catch (error) {
    alert("Error connecting to server! Check if FastAPI is running. ❌");
    console.error(error);
  }
}

function highlightKeywords(text, isSpam) {
  const kwSection = document.getElementById("keywordsSection");
  const kwContainer = document.getElementById("keywordsContainer");
  kwContainer.innerHTML = "";

  if (!isSpam) {
    kwSection.classList.add("hidden");
    return;
  }

  const foundWords = triggerWordsList.filter(word => 
    text.toLowerCase().includes(word.toLowerCase())
  );

  if (foundWords.length > 0) {
    foundWords.forEach(word => {
      const chip = document.createElement("span");
      chip.className = "kw-chip";
      chip.innerText = word.toUpperCase();
      kwContainer.appendChild(chip);
    });
    kwSection.classList.remove("hidden");
  } else {
    kwSection.classList.add("hidden");
  }
}

function updateStatsUI() {
  document.getElementById("totalScans").innerText = stats.total;
  document.getElementById("totalSpam").innerText = stats.spam;
  document.getElementById("totalHam").innerText = stats.ham;
}

function copyResult() {
  const label = document.getElementById("resultLabel").innerText;
  const score = document.getElementById("confidenceScore").innerText;
  const text = document.getElementById("emailInput").value;

  const resultText = `[AI Email Security Guard Result]\nStatus: ${label}\nConfidence: ${score}\nContent: "${text}"`;
  
  navigator.clipboard.writeText(resultText);
  alert("Analysis summary copied to clipboard! 📋");
}

function addToHistory(text, label, isSpam, confidence) {
  scanHistory.unshift({ text, label, isSpam, confidence });
  renderHistory();
}

function clearHistory() {
  scanHistory = [];
  renderHistory();
}

function renderHistory() {
  const historyList = document.getElementById("historyList");
  
  if (scanHistory.length === 0) {
    historyList.innerHTML = `<p class="empty-msg"><i class="fa-solid fa-inbox"></i> No scans executed yet.</p>`;
    return;
  }

  historyList.innerHTML = scanHistory.map(item => `
    <div class="history-item">
      <span class="history-text" title="${item.text}">${item.text}</span>
      <span class="history-tag ${item.isSpam ? 'spam' : 'ham'}">
        ${item.label} (${item.confidence}%)
      </span>
    </div>
  `).join('');
}