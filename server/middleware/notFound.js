const notFound = (req, res, next) => {
    res.status(404).send({ msg: "page is not defound" });
}

export {
    notFound
}