import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "d492f5b70b4ec33a4747087e1c598d70",
    language: "ko-KR",
  },
});

export default instance;
