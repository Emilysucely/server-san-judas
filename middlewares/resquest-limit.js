import ratelimit from "express-rate-limit";

const requestlimit = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

export default requestlimit 