// Состояния для каждого пользователя (конечный автомат)
class StateManager {
  constructor() {
    this.userStates = new Map(); // userId -> { command, step, data }
  }

  getState(userId) {
    return this.userStates.get(userId) || { command: null, step: null, data: {} };
  }

  setState(userId, command, step, data = {}) {
    this.userStates.set(userId, { command, step, data });
  }

  clearState(userId) {
    this.userStates.delete(userId);
  }

  // Проверка, находится ли пользователь в процессе команды
  isInCommand(userId) {
    const state = this.getState(userId);
    return state.command !== null;
  }
}

export default new StateManager();
