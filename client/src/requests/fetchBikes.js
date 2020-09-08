
const fetchBikes = async () => {
    const response = await fetch("http://localhost:9000", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
     return await response.json();
}
export { fetchBikes };