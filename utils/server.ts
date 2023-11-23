import app from "..";

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`👀 app is running at localhost:${PORT}`);
});

export default server;