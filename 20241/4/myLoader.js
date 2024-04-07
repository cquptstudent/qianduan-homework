module.exports = str => {
    str = str.replace(/'/g, '\"'); // 把'改成"
    return str
}