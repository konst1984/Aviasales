const apiBaseGetId = 'https://aviasales-test-api.kata.academy/search';

export const getId = async () => {
  const res = await fetch(`${apiBaseGetId}`);
  if (!res.ok) {
    throw new Error(`Could not fetch: ${apiBaseGetId}`);
  }
  return await res.json();
};
