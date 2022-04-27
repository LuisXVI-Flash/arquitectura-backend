const crypto = require('crypto')

exports.encryptedPassword = (password) => {
    const sha1 = crypto.createHash('md5')
    return sha1.update(String(password), 'utf8').digest('hex')
}