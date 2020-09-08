const fetchBike = async (id) => {
    const response = await fetch(
        `http://localhost:9000/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return await response.json();
      
}
export { fetchBike };