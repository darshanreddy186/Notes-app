export function applySearchSort(notes, search, sortOption){
  const s = (search || '').toLowerCase();
  let filtered = notes.filter(n => (n.title||'').toLowerCase().includes(s) || (n.body||'').toLowerCase().includes(s));
  if (sortOption === 'updated_desc') filtered.sort((a,b)=> (b.updatedAt||b.createdAt)-(a.updatedAt||a.createdAt));
  else if (sortOption === 'updated_asc') filtered.sort((a,b)=> (a.updatedAt||a.createdAt)-(b.updatedAt||b.createdAt));
  else if (sortOption === 'title_asc') filtered.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
  else if (sortOption === 'title_desc') filtered.sort((a,b)=> (b.title||'').localeCompare(a.title||''));
  return filtered;
}
