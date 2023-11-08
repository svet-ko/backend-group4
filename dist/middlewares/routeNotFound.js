export function routeNotFound(_, res) {
    res.status(404).json({ msg: "Route Not Found." });
}
