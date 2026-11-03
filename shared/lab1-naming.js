/* Approved Claude naming updates from the isolated review. */
(() => {
  if(document.body.dataset.deck!=="complete")return;
  const deck=window.DECKS.complete;
  const section=n=>document.querySelector(`.slide[data-slide="${n}"]`);
  const setTitle=(n,title)=>{section(n).querySelector('h1').textContent=title;deck.slides.find(s=>s.n===n).title=title;};
  section(4).querySelectorAll('.agent-programme-labels b')[1].textContent='Project Management Agent';
  section(4).querySelectorAll('.agent-programme-labels b')[2].textContent='SEO Marketer';
  section(5).querySelector('.deployment-build b').textContent='Claude (ex Cowork) & Code';
  section(5).querySelector('[data-review-tab="code"]').textContent='Code & Claude (ex Cowork)';
  document.querySelectorAll('.execution-tabs button').forEach(button=>{
    if(/^(Cowork|Chat and Cowork)$/i.test(button.textContent.trim()))button.textContent='Claude (ex Cowork)';
  });
  setTitle(15,'Claude (ex Chat + Cowork) or Code');
  section(15).querySelector('.mode-cards').innerHTML='<article><b>The new Claude experience<small>(ex Chat and Cowork)</small></b><span>Answers questions<br>and completes whole tasks</span></article><article><b>Code</b><span>Creates code and edits project files</span></article>';
  section(30).querySelector('.session-checklist-sheet li span').textContent='Claude or Code';
  deck.slides.find(s=>s.n===4).items=['Lab 1: Web Builder','Lab 2: Project Management Agent','Lab 3: SEO Marketer','Lab 4: Lead Builder'];
  deck.slides.find(s=>s.n===15).items=['Claude (ex Chat + Cowork)','Code'];
  deck.slides.forEach((slide,index)=>{document.querySelector('#progress').children[index].title=`${slide.displayN ?? slide.n}. ${slide.title}`;});
})();
