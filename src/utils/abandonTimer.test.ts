import {
  cancelAbandon,
  createAbandonTimerState,
  markAbandonHandled,
  scheduleAbandon,
} from './abandonTimer';

describe('abandonTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('fires onFire exactly once after windowMs has elapsed', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'zairyu', 10_000, onFire);
    expect(onFire).not.toHaveBeenCalled();

    jest.advanceTimersByTime(9_999);
    expect(onFire).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(onFire).toHaveBeenCalledTimes(1);
    expect(onFire.mock.calls[0][0]).toBe('zairyu');
  });

  it('debounces — rescheduling cancels the prior timer', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'z', 10_000, onFire);
    jest.advanceTimersByTime(5_000);

    scheduleAbandon(state, 'za', 10_000, onFire);
    jest.advanceTimersByTime(5_000);
    // The first 10s window for 'z' has elapsed in real time, but
    // the timer was canceled when 'za' rescheduled.
    expect(onFire).not.toHaveBeenCalled();

    scheduleAbandon(state, 'zai', 10_000, onFire);
    jest.advanceTimersByTime(10_000);
    expect(onFire).toHaveBeenCalledTimes(1);
    expect(onFire.mock.calls[0][0]).toBe('zai');
  });

  it('cancelAbandon stops a pending timer (no fire after the window)', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'zairyu', 10_000, onFire);
    jest.advanceTimersByTime(5_000);
    cancelAbandon(state);
    jest.advanceTimersByTime(20_000);
    expect(onFire).not.toHaveBeenCalled();
  });

  it('markAbandonHandled prevents fire and the same query cannot re-fire without re-scheduling', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'nenkin', 10_000, onFire);
    jest.advanceTimersByTime(3_000);
    markAbandonHandled(state, 'nenkin');
    jest.advanceTimersByTime(20_000);
    expect(onFire).not.toHaveBeenCalled();
  });

  it('same query CAN abandon again after an intervening query change', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'nenkin', 10_000, onFire);
    jest.advanceTimersByTime(10_000);
    expect(onFire).toHaveBeenCalledTimes(1);

    // Different query refines but resolves to the same string later.
    scheduleAbandon(state, 'shakai', 10_000, onFire);
    jest.advanceTimersByTime(5_000);

    scheduleAbandon(state, 'nenkin', 10_000, onFire);
    jest.advanceTimersByTime(10_000);
    expect(onFire).toHaveBeenCalledTimes(2);
    expect(onFire.mock.calls[1][0]).toBe('nenkin');
  });

  it('msSinceQuery passed to onFire equals the scheduled window', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'zairyu', 10_000, onFire);
    jest.advanceTimersByTime(10_000);
    expect(onFire).toHaveBeenCalledTimes(1);
    // The handler passes the elapsed ms — in fake-timer world this
    // equals the scheduled window. Real-world value would also
    // include any setTimeout dispatch delay but be very close.
    expect(onFire.mock.calls[0][1]).toBeGreaterThanOrEqual(10_000);
  });

  it('multiple cancels are safe (idempotent)', () => {
    const state = createAbandonTimerState();
    const onFire = jest.fn();

    scheduleAbandon(state, 'zairyu', 10_000, onFire);
    cancelAbandon(state);
    cancelAbandon(state);
    cancelAbandon(state);
    jest.advanceTimersByTime(20_000);
    expect(onFire).not.toHaveBeenCalled();
  });
});
