const db = require("../config/db");

class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
        INSERT INTO posts (
            title,
            body,
            created_at
        )
        VALUES(
            '${this.title}',
            '${this.body}',
            '${createdAtDate}'
        )
        `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM posts;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM posts WHERE id = ${id};`;
    return db.execute(sql);
  }

  async update(id, title, body) {
    let sql = `
      UPDATE posts 
      SET
        title = ?,
        body = ?
      WHERE id = ?;
    `;

    return db.execute(sql, [title, body, id]);
  }

  static deletePostById(id) {
    const sql = `
      DELETE FROM posts
      WHERE id = ${id};
    `;

    return db.execute(sql, [id]);
  }
}

module.exports = Post;
