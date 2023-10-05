import "colors";

const server = (app) => {
  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, (err) => {
    console.log(`App running on port: ${PORT.green}`);
  });
  return server
};

export default server;
