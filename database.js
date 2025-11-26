const DB_PREFIX = 'app_db_';

async function saveRecord(table, record) {
  try {
    const records = await getRecords(table);
    record.id = record.id || Date.now().toString();
    record.createdAt = record.createdAt || new Date().toISOString();
    records.push(record);
    localStorage.setItem(DB_PREFIX + table, JSON.stringify(records));
    return record;
  } catch (error) {
    console.error('Error saving record:', error);
    throw error;
  }
}

async function getRecords(table) {
  try {
    const data = localStorage.getItem(DB_PREFIX + table);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting records:', error);
    return [];
  }
}

async function updateRecord(table, id, updates) {
  try {
    const records = await getRecords(table);
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(DB_PREFIX + table, JSON.stringify(records));
      return records[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
}

async function deleteRecord(table, id) {
  try {
    const records = await getRecords(table);
    const filtered = records.filter(r => r.id !== id);
    localStorage.setItem(DB_PREFIX + table, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
}