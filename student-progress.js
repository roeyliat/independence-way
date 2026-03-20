
(function(){
  const KEY='derech_progress_v1';
  const DEFAULT_STEPS=['lemon-sequence','lemon-ninja','coin-recognition','banknote-recognition','money-mix','build-amount','find-cheapest','price-compare','shopping-list','checkout','recycling'];
  function get(){
    const active = window.AppState ? AppState.active() : 'תלמיד 1';
    let data = {byStudent:{}};
    try{ data = Object.assign(data, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){}
    if(!data.byStudent[active]) data.byStudent[active]={steps:{}, points:0, lastPage:'index.html'};
    return {data, active};
  }
  function save(data){ localStorage.setItem(KEY, JSON.stringify(data)); }
  window.Progress = {
    mark(stepKey, points, nextPage){
      const {data, active}=get();
      const s=data.byStudent[active];
      if(!s.steps[stepKey]) { s.steps[stepKey]=true; s.points += Number(points||10); if(window.AppState) AppState.addClassPoints(points||10); }
      if(nextPage) s.lastPage=nextPage;
      save(data);
    },
    setLast(page){
      const {data, active}=get();
      data.byStudent[active].lastPage=page; save(data);
    },
    getStudent(activeName){
      const active = activeName || (window.AppState ? AppState.active() : 'תלמיד 1');
      let data={byStudent:{}}; try{ data=Object.assign(data, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){}
      return data.byStudent[active] || {steps:{}, points:0, lastPage:'index.html'};
    }
  };
})();
