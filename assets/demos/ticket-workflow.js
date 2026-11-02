// Synthetic demonstration workflow. No network calls, authentication or customer data.
export function createWorkflow(repository, { broken = false } = {}) {
  let pending = [];
  return {
    async save(ticket) {
      if (!ticket || !/^DEMO-[0-9]{3}$/.test(ticket.id)) throw new Error('Use a synthetic demonstration ticket.');
      if (broken) { pending.push({ ...ticket }); return { ok: true, id: ticket.id }; }
      await repository.put({ ...ticket });
      return { ok: true, id: ticket.id };
    },
    async list() { return repository.list(); },
    // Simulates opening a fresh workflow instance. In-memory writes are lost.
    reload() { pending = []; return repository.list(); }
  };
}
