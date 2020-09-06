import { environment } from "./../../environments/environment.prod";

export const baseUrl = environment.production
  ? "https://cocos-api.herokuapp.com"
  : "http://localhost:3000";
