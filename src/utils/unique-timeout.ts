interface TimeoutIds {
  [key: string]: ReturnType<typeof setTimeout>;
}

const timeoutIds: TimeoutIds = {};

function uniqueTimeout(id: string, fn: () => any, timeout: number = 250): void {
  clearTimeout(timeoutIds[id]);
  timeoutIds[id] = setTimeout(fn, timeout);
}

export default uniqueTimeout;
