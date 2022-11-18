const regexExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/

const videos = ["mp4", "m4p", "m4v", "mpg", "mpeg", "mp2", "mpe", "mpv",
    "3gp", "ogg", "webm", "avi", "wmv", "mkv", "mov", "flv"]

const images = ["jpg", "gif", "png", "jpeg", "webp","raw", "tiff", "bmp", "psd"]

const Constants = {
    images,
    videos,
    regexExp
}
export default Constants;
