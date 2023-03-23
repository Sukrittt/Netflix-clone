import axios from "axios";

//will send a GET request to this URL to retrieve the data.
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
