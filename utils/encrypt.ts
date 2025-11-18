/**
 * 评估密码强度并返回一个分数。
 * @param {string} password - 用户输入的密码字符串。
 * @returns {number} 密码强度分数 (0-5)。
 *
 * 评分标准：
 * - 0: 空或极短 (<= 4位)
 * - 1: 弱 (仅长度或仅一种字符，<= 7位)
 * - 2: 中等 (长度合格但种类不足，或长度不足但种类合格)
 * - 3: 良好 (长度 >= 8 且满足 2 种字符)
 * - 4: 强 (长度 >= 10 且满足 3 种字符)
 * - 5: 非常强 (长度 >= 12 且满足 4 种字符)
 */
export const getPasswordStrengthScore = (password: string) => {
  // 1. 初始化分数和正则表达式
  let score = 0

  // 正则表达式，用于检查包含的字符种类
  const rules = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|~`]/, // 常见的特殊字符集
  }

  // 2. 检查字符种类 (Diversity)
  let matchedCount = 0

  // 遍历规则，检查密码匹配了多少种字符
  Object.values(rules).forEach(rule => {
    if (rule.test(password)) {
      matchedCount += 1
    }
  })

  // 根据匹配到的种类数量加分 (最高加 3 分)
  if (matchedCount >= 4) {
    score += 3
  } else if (matchedCount === 3) {
    score += 2
  } else if (matchedCount === 2) {
    score += 1
  }

  // 3. 检查密码长度 (Length)
  const length = password.length

  if (length >= 12) {
    score += 2 // 长度 >= 12，加 2 分
  } else if (length >= 8) {
    score += 1 // 长度 8-11，加 1 分
  } else if (length === 0) {
    return 0 // 空密码直接返回 0 分
  }

  // 4. 确保分数在 0 到 5 之间
  // 虽然我们的设计不会超过 5，但这是一个良好的编程习惯
  return Math.min(score, 5)
}

/**
 * 对邮箱地址进行脱敏处理，将用户名部分的中间几位替换为星号。
 *
 * 规则：
 * 1. 保留用户名的第一位和最后一位。
 * 2. 如果用户名过短（<= 4位），则只保留第一位，其余替换为星号。
 * 3. @ 符号和域名部分完全保留。
 *
 * @param {string} email - 原始邮箱地址，例如 "username.test@example.com"
 * @returns {string} 加密后的邮箱地址，例如 "u****t@example.com"
 */
export const maskEmail = (email: string) => {
  if (!email || typeof email !== 'string') {
    return '' // 处理空值或非字符串输入
  }

  // 1. 查找 @ 符号的位置
  const atIndex = email.indexOf('@')

  // 2. 如果没有 @ 符号或 @ 在开头/结尾，则认为不是有效邮箱，直接返回
  if (atIndex <= 0 || atIndex === email.length - 1) {
    return email
  }

  // 3. 分割出用户名和域名部分
  const username = email.substring(0, atIndex)
  const domain = email.substring(atIndex) // domain 部分包含 @

  // 4. 处理用户名部分
  const usernameLength = username.length
  let maskedUsername

  if (usernameLength <= 4) {
    // 如果用户名很短 (例如: "abc")，保留第一位，其余用 * 代替
    const firstChar = username.charAt(0)
    const stars = '*'.repeat(usernameLength - 1)
    maskedUsername = firstChar + stars
  } else {
    // 用户名较长 (例如: "username")
    // 保留第一位
    const firstChar = username.charAt(0)
    // 保留最后一位
    const lastChar = username.charAt(usernameLength - 1)
    // 中间用星号填充 (长度：总长 - 2)
    const middleStars = '*'.repeat(usernameLength - 2)

    maskedUsername = firstChar + middleStars + lastChar
  }

  // 5. 拼接并返回结果
  return maskedUsername + domain
}
