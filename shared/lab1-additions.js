(() => {
 const labels=["Artificial intelligence", "Machine learning", "Deep learning", "Generative AI"];
 const explanations=["Machines performing tasks associated with human intelligence", "Learns patterns from data to make predictions", "Learns patterns using multilayered neural networks", "Creates content using patterns learned during training"];
 for(const n of [40]){
  const s=document.querySelector(`.slide[data-slide="${n}"]`);
  const picture=n===40;
  s.querySelector('.visual-stage').innerHTML=`<div class="family-layout"><div class="family-picture ${picture?'tactile':'schematic'}" role="img" aria-label="Artificial intelligence contains machine learning which contains deep learning and modern generative AI">${picture?'<img src="../shared/assets/lab1-additions/ai-family-bottom.png" alt="Four concentric trays nested one inside another">':'<div class="family-ring ring-ai"></div><div class="family-ring ring-ml"></div><div class="family-ring ring-dl"></div><div class="family-ring ring-gen"></div>'}${labels.map((label,i)=>`<span class="family-name family-name-${i}">${i===3?"Generative<br>AI":label}</span>`).join('')}</div><div class="family-definitions">${explanations.map((text,i)=>`<p class="family-definition definition-${i}">${i===0?"Machines performing tasks<br>associated with human intelligence":text}</p>`).join('')}</div></div>`;
 }
 const capability=document.querySelector('.slide[data-slide="41"] .visual-stage');
 const rows=[['Primary role','Recognise patterns','Create content','Pursue goals'],['How it works','Classifies or predicts','Generates responses','Chooses steps and uses tools'],['Learning style','Rule-based, supervised','Pattern-based, self-supervised','Contextual, continuous learning']];
 capability.innerHTML=`<div class="capability-grid" role="table" aria-label="AI capabilities"><div class="capability-head" role="row"><span role="columnheader"></span>${['Traditional AI','Generative AI','Agentic AI'].map(t=>`<h2 role="columnheader">${t}</h2>`).join('')}</div>${rows.map(row=>`<div class="capability-row" role="row"><b role="rowheader">${row[0]}</b>${row.slice(1).map(t=>`<p role="cell">${t}</p>`).join('')}</div>`).join('')}</div>`;
 const governance=document.querySelector('.slide[data-slide="42"] .visual-stage');
 const short=['Own responsibility','Consider impacts','Manage risks','Share information','Test and monitor','Maintain control'];
 const marks=['01','02','03','04','05','06'];
 governance.innerHTML=`<div class="responsibility-grid">${short.map((text,i)=>`<article><span class="practice-mark" aria-hidden="true">${marks[i]}</span><h2>${text}</h2></article>`).join('')}</div><a class="government-guidance" href="https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-foundations" target="_blank" rel="noopener">Australian government guidance ↗</a>`;
})();
