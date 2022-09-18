import dotenv from "dotenv";
dotenv.config();
import jsonwebtoken from "jsonwebtoken";

class tokenController {
  // generate jwt
  static generateJwt(payload) {
    try {
      let privateKey = process.env.JWT_PVT_KEY;
      console.log(privateKey);
      console.log({ payload });
      return jsonwebtoken.sign(payload, privateKey, { algorithm: "HS256" });
    } catch (error) {
      console.error("Error while generating token", error);
      throw error;
    }
  }

  // verify token
  static verifyJwt(token) {
    try {
      let privateKey = process.env.JWT_PVT_KEY;
      return jsonwebtoken.verify(token, privateKey);
    } catch (error) {
      //   console.error("Error while verifying token", error);
      throw error;
    }
  }
}

export { tokenController };
