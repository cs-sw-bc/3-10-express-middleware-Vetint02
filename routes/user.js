import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("All users");
});

router.post("/", (req, res) => {
  res.send("Create a user");
});


// route-level middleware
// send to next if the user has a secret in the body
// if secret is missing, then send error response
function validateSecret(req, res, next)
{
  if (req.body.secret)
  {
    next();
  }
  else{
    res.status(401).json({message:"Unauthorized"});
  }
}


router.post("/test-json", validateSecret, (req, res) => {
  console.log("Received JSON body:", req.body);
  res.json({
    message: "JSON parsed successfully!",
    yourData: req.body
  });
});

router.post("/test-form", (req, res) => {
  console.log("Received FORM body:", req.body);
  res.json({
    message: "Form data parsed successfully!",
    yourData: req.body
  });
});



export default router;
