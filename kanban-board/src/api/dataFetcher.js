// fetch is used to make a GET request to the specified URL
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export { fetchData };
