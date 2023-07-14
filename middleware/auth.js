import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try { 
      let token = req.headers.authorization
  
      console.log("userToken1" , token)
      if (!token) {
        return res.status(403).send("Access Denied");
      }

      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]
      }
      console.log("userToken2", token);

      const verified = jwt.verify(token,"secret123");
      console.log("verified", verified);
      req.user = verified;
      // console.log("req.user", user.req);
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

