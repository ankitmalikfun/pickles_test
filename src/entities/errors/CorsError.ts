export default (err, req, res, next) => {
  const { headers: { origin } } = req;
  if (!origin) {
    return next();
  }
  return res.status(401).send({
    errors: [{
      message: `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote
 resource from origin ${origin}`,
      extensions: { code: 'UNAUTHORIZED' }
    }]
  });
};
