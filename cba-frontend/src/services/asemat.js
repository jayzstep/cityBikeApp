import axios from "axios";
const baseUrl = "/api/asemat";

const getAll = async ({ limit, skip, search }) => {
  const response = await axios.get(
    baseUrl + `?limit=${limit}&skip=${skip}&search=${search}`
  );
  return response.data;
};

export default { getAll };
