
(function(){
  function speak(text){
    if(!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'he-IL';
    u.rate = 0.9;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  }
  window.speakInstruction = speak;
  window.speakSuccess = function(){ speak('כל הכבוד'); };
  window.speakTryAgain = function(){ speak('בוא נבדוק שוב'); };
  window.speakHint = function(t){ speak(t || 'הסתכל על כל האפשרויות'); };
})();
