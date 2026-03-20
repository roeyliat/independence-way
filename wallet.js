
(function(){
  const KEY = 'derech_wallet_v1';
  const STUDENTS_KEY = 'derech_students_v1';
  function getStudents(){
    try{
      return JSON.parse(localStorage.getItem(STUDENTS_KEY)||'["תלמיד 1"]');
    }catch(e){ return ["תלמיד 1"]; }
  }
  function ensure(){
    let data={students:getStudents(), active:getStudents()[0]||"תלמיד 1", wallets:{}, classPoints:0, classGoal:300, prizeShown:false};
    try{
      data = Object.assign(data, JSON.parse(localStorage.getItem(KEY)||'{}'));
    }catch(e){}
    data.students = Array.isArray(data.students)&&data.students.length?data.students:getStudents();
    if(!data.active) data.active = data.students[0];
    data.students.forEach(n=>{ if(typeof data.wallets[n] !== 'number') data.wallets[n]=0; });
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }
  function save(data){ localStorage.setItem(KEY, JSON.stringify(data)); return data; }
  window.AppState = {
    get(){ return ensure(); },
    students(){ return ensure().students; },
    addStudent(name){
      const data=ensure(); name=(name||'').trim(); if(!name) return;
      if(!data.students.includes(name)) data.students.push(name);
      if(typeof data.wallets[name] !== 'number') data.wallets[name]=0;
      data.active=name; save(data);
    },
    deleteStudent(name){
      const data=ensure();
      data.students = data.students.filter(n=>n!==name);
      delete data.wallets[name];
      if(!data.students.length){ data.students=['תלמיד 1']; data.wallets['תלמיד 1']=0; }
      if(data.active===name) data.active=data.students[0];
      save(data);
    },
    setActive(name){ const d=ensure(); if(d.students.includes(name)) { d.active=name; save(d);} },
    active(){ return ensure().active; },
    wallet(name){ const d=ensure(); return d.wallets[name||d.active]||0; },
    addMoney(amount,name){ const d=ensure(); const n=name||d.active; d.wallets[n]=(d.wallets[n]||0)+Number(amount||0); save(d); },
    spendMoney(amount,name){ const d=ensure(); const n=name||d.active; const a=Number(amount||0); if((d.wallets[n]||0) < a) return false; d.wallets[n]-=a; save(d); return true; },
    addClassPoints(points){ const d=ensure(); d.classPoints += Number(points||0); save(d); return d.classPoints; },
    classPoints(){ return ensure().classPoints; },
    classGoal(){ return ensure().classGoal; }
  };
})();
