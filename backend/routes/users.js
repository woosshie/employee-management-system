// 파일 위치: routes/users.js

const express = require('express')
const router = express.Router()
const db = require('../db') // DB 연결

// 사용자 정보 가져오기
router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  const sql = 'SELECT * FROM user WHERE userId = ?'
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Database query error:', err); // 오류 로그 출력
      return res.status(500).json({ error: 'Database error' })
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(result[0])
  })
})


// 사용자 정보 업데이트
router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    const { username, email, first_name, last_name, address, city, post_code, about } = req.body;
    const sql = 'UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, address = ?, city = ?, post_code = ?, about = ? WHERE id = ?';

    db.query(sql, [username, email, first_name, last_name, address, city, post_code, about, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'User updated successfully' });
    });
});

// 비밀번호 변경
router.post('/:userId/change-password', (req, res) => {
    const userId = req.params.userId;
    const { current_password, new_password } = req.body;

    // 사용자 비밀번호 변경 로직을 여기에 추가하세요.
    res.json({ message: 'Password changed successfully' });
});

module.exports = router