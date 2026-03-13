function parseCSV(text) {
  const rows = [];
  let cur = '';
  let row = [];
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    
    if (ch === '"') {
      if (inQuotes && text[i+1] === '"') { // подвійні лапки -> один символ "
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    
    if (!inQuotes && ch === ',') {
      row.push(cur);
      cur = '';
      continue;
    }
    
    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (cur || row.length) row.push(cur);
      if (row.length) rows.push(row);
      cur = '';
      row = [];
      if (ch === '\r' && text[i+1] === '\n') i++; // CRLF
      continue;
    }
    
    cur += ch;
  }
  
  if (cur || row.length) row.push(cur);
  if (row.length) rows.push(row);

  return rows;
}