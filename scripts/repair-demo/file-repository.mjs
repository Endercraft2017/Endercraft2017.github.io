import {readFile,writeFile,rename} from 'node:fs/promises';
// One-process demonstration adapter. Not a database or a multi-writer store.
export function fileRepository(filename) {
  const list = async () => {
    try { return JSON.parse(await readFile(filename, 'utf8')); }
    catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  };
  return {
    list,
    async put(ticket) {
      const rows = await list();
      const index = rows.findIndex(row => row.id === ticket.id);
      if (index === -1) rows.push(ticket); else rows[index] = ticket;
      await writeFile(filename + '.next', JSON.stringify(rows), {mode: 0o600});
      await rename(filename + '.next', filename);
    }
  };
}
