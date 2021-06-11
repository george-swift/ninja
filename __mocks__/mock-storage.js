const mockStoreKata = jest.fn().mockImplementation((kata) => {
  const total = JSON.stringify(kata);
  localStorage.setItem('kata', total);
});

const mockRetrieveKata = jest.fn().mockImplementation(() => {
  const total = localStorage.getItem('kata') ? JSON.parse(localStorage.getItem('kata')) : 0;
  return total;
});

export { mockStoreKata, mockRetrieveKata };