---
sitemap: true
layout: simple
title: Linux Testi - Linux Bilginizi Test Edin
excerpt: "Temel Linux Testi | 200 Soru"
search_omit: true
---

 <h1>🎯 Linux Testi</h1>
  <hr>
  <div id="info-text">
    <p class="mavi">Bu test, Linux temellerine ne kadar hakim olduğunuz konusunda fikir verebilir. Ancak unutmayın, burada asıl mesele sorulara ezberden cevap vermekten ziyade, ilgili soruna nasıl çözüm bulabileceğinizi kendi başınıza keşfedebilmenizdir. Bu sebeple soruları cevaplarken man sayfaları gibi yardım kaynaklarını ve elbette komut satırını serbestçe kullanabilirsiniz.</p>
    <p class="mavi"><strong>ℹ️ Not:</strong> Buradaki sorular, <a href="{{ site.url }}/temel-linux.html">temel Linux eğitimi</a> içerisinde sorulmuş olan soruların toplamıdır. Açıkçası çoktan seçmeli soruların bilgi veya yetenek ölçmede pek doğru bir yaklaşım olduğunu düşünmüyorum. Yine de sizi araştırmaya veya pratik yapmaya itebileceği için eklemek istedim.</p>

    <button class="mavi btn btn-outline-primary btn-lg" onclick="startQuiz()">Teste Başla</button>
  </div>
  <div id="quiz" style="display: none;">
  <div class="progress">
    <div id="progress-bar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
  </div>
  <hr>
    <div id="question"></div>
    <div id="options" class="list-group"></div>
  </div>

  <div id="result" style="display: none;">
  <p class="text-primary">Testi tamamlama sabrını gösterdiğiniz için tebrikler🥳 </p>
    <h2>Sonuç</h2>
    <p id="stats"></p>
    <h3>Hatalar ve Doğru Yanıtları</h3>
	<p>Test içerisinde sorulan tüm sorular, mevcut platformda bulunan bilgiler dahilinde hazırlanmıştır. Dolayısıyla eksik olduğunuz konular varsa platform üzerinden bilgi edinebilirsiniz.</p>
  <p>Hatalı yanıtladığınız sorular:</p>
    <ul id="feedback"></ul>
	<p class="mavi">ℹ️ Testin kendisinde hatalar varsa <a href="{{ site.url }}/bildirim.html">geri bildirim</a> sayfasından iletmekten çekinmeyin lütfen.</p>

  <h3>Skorunu paylaşmaya ne dersin ?</h3>
<button id="linkedinShareButton" class="mavi btn btn-outline-primary">
  <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"></path></g></svg>
  Paylaş
</button>
<button id="twitterShareButton" class="mavi btn btn-outline-primary">
  <svg width="24px" height="24px" viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Twitter-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#00AAEC"> <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter"> </path> </g> </g> </g></svg>
  Paylaş
</button>

  </div>


  <script>
  var questions = []; // Initialize an empty array for questions

fetch("{{ site.url }}/data/questions/questions.json")// Replace "abc.json" with the actual path to your JSON file
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    // Store the loaded questions in the 'questions' variable
    questions = data;
  })
  var currentQuestion = 0;
  var trueCount = 0;
  var falseCount = 0;
  var userAnswers = [];


  var cachedState = localStorage.getItem("quizState");

 function startQuiz() {
  if (cachedState) {
    // Show the "Continue from where you left off" message
    document.getElementById("info-text").innerHTML =
      "<p class='mavi'>Teste kaldığınız yerden devam edebilirsiniz..</p>";
    // Restore the cached state
    var quizState = JSON.parse(cachedState);
    currentQuestion = quizState.currentQuestion;
    trueCount = quizState.trueCount;
    falseCount = quizState.falseCount;
    userAnswers = quizState.userAnswers;
    showQuestion();
  } else {
    // Show the initial "Teste Başla" message
    // Reset the cached state
	document.getElementById("info-text").style.display = "none";
    localStorage.removeItem("quizState");
    currentQuestion = 0;
    trueCount = 0;
    falseCount = 0;
    userAnswers = [];
    showQuestion();
  }
  // Hide the result section
  document.getElementById("result").style.display = "none";
  // Show the quiz section
  document.getElementById("quiz").style.display = "block";
}


  function showQuestion() {
  var questionElement = document.getElementById("question");
  var optionsElement = document.getElementById("options");
  var currentQuestionObj = questions[currentQuestion];

  questionElement.textContent = currentQuestionObj.question;
  optionsElement.innerHTML = '';

  currentQuestionObj.options.forEach(function(option) {
    var listItem = document.createElement("a");
    listItem.textContent = option;
    listItem.className = "list-group-item list-group-item-action";
    listItem.addEventListener("click", function() {
      selectAnswer(option);
    });

    optionsElement.appendChild(listItem);
  });

  updateProgressBar();
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  cacheState();

  var resetCacheButton = document.createElement("button");
  resetCacheButton.textContent = "Sıfırla - Teste Yeniden Başla";
  resetCacheButton.className = "kirmizi btn btn-outline-danger btn-lg";
  resetCacheButton.addEventListener("click", resetCache);
  optionsElement.appendChild(document.createElement("br"));
  optionsElement.appendChild(resetCacheButton);
  
}


    function selectAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    checkAnswer();
  }

  function checkAnswer() {
    if (userAnswers.length > currentQuestion) {
      var answer = userAnswers[currentQuestion];
      if (answer === questions[currentQuestion].answer) {
        trueCount++;
      } else {
        falseCount++;
      }

      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
        document.getElementById("devamButton").style.display = "none";
      }
    }
    cacheState();
  }

  function updateProgressBar() {
    var progressBar = document.getElementById("progress-bar");
    var progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
    progressBar.textContent = progress.toFixed(0) + "%";
  }

  function showResult() {
  var statsElement = document.getElementById("stats");
  var feedbackElement = document.getElementById("feedback");

  var percentageCorrect = ((trueCount / questions.length) * 100).toFixed(2) + "%";
  statsElement.innerHTML = " " + percentageCorrect + " (doğru oranı: " + trueCount + " / " + questions.length + ") ";

  feedbackElement.innerHTML = ''; // Clear previous feedback

  questions.forEach(function(question, index) {
    if (userAnswers[index] !== question.answer) {
      var listItem = document.createElement("li");
      var questionSpan = document.createElement("span");
      var userAnswerSpan = document.createElement("span");
      var correctAnswerSpan = document.createElement("span");

      questionSpan.textContent = question.question;
      userAnswerSpan.textContent = "Sizin yanıtınız: " + userAnswers[index];
      correctAnswerSpan.textContent = "Doğru yanıt: " + question.answer;

      userAnswerSpan.style.color = "red";
      correctAnswerSpan.style.color = "green";

      listItem.appendChild(questionSpan);
      listItem.appendChild(document.createElement("br"));
      listItem.appendChild(userAnswerSpan);
      listItem.appendChild(document.createElement("br"));
      listItem.appendChild(correctAnswerSpan);
      feedbackElement.appendChild(listItem);
    }
  });


  document.getElementById("quiz").style.display = "none";
  document.getElementById("info-text").style.display = "none";

  // Display the result section
  var resultSection = document.getElementById("result");
  resultSection.style.display = "block";
  localStorage.removeItem("quizState");


}
// Twitter share button functionality
      var twitterShareButton = document.getElementById("twitterShareButton");
      twitterShareButton.addEventListener("click", function() {
        var tweetText = "#Linux Dersleri platformundaki testte " + questions.length + "/" + trueCount + " skor yaptım. Linux bilginizi test etmek isterseniz göz atın. {{ site.url }}{{ page.url }}";
        var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
        window.open(tweetUrl, "_blank");
      });

      // LinkedIn share button functionality
      var linkedinShareButton = document.getElementById("linkedinShareButton");
      linkedinShareButton.addEventListener("click", function() {
        var shareText = "#Linux Dersleri platformundaki testte " + questions.length + "/" + trueCount + " skor yaptım. Linux bilginizi test etmek isterseniz göz atın.";
        var shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url={{ site.url }}{{ page.url }}&summary=";
        var quizUrl = "{{ site.url }}/test"; // Replace with your quiz URL
        var postUrl = shareUrl + encodeURIComponent(shareText) + encodeURIComponent(quizUrl);
        window.open(postUrl, "_blank");
      });
    
    

  function cacheState() {
    // Create an object to store the current state
    var quizState = {
      currentQuestion: currentQuestion,
      trueCount: trueCount,
      falseCount: falseCount,
      userAnswers: userAnswers
    };

    // Store the state in localStorage
    localStorage.setItem("quizState", JSON.stringify(quizState));
  }

  function resetCache() {
    // Remove the cached state
    localStorage.removeItem("quizState");
    location.reload(); // Reload the page to start the quiz from the beginning
  }
</script>

   
