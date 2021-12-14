import db from "../Config/db.config.js";

class ArtistModel {
  constructor() {
    console.log("Class artist model is loaded");
  }

  list = (req, res) => {
    return new Promise((resolve, reject) => {
      const orderKey = req.query.orderBy || "s.id";
      const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";
      let sql = `SELECT * 
						FROM artist
						`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  search = (req, res) => {
    return new Promise((resolve, reject) => {
      const orderKey = req.query.orderBy || "s.id";
	  let keyword = req.query.keyword
      const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";
      let sql = `SELECT *
						FROM artist  
						WHERE name LIKE '%${keyword}%'`
						;
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
			const searchresults = {
				matches: result.length,
				result
			}
          resolve(searchresults);
        }
      });
    });
  };

  get = (req, res) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT name 
							FROM artist
							WHERE name = ?`;
      db.query(sql, [req.params.id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(...result);
        }
      });
    });
  };

  create = async (req, res) => {
    return new Promise((resolve, reject) => {
      const arrFormValues = Object.values(req.body);
      const sql = `INSERT INTO artist(name) 
							VALUES(?)`;
      db.query(sql, arrFormValues, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: "OK", id: result.insertId});
        }
      });
    });
  };

  update = async (req, res) => {
    return new Promise((resolve, reject) => {
      const arrFormValues = Object.values(req.body);
      console.log(arrFormValues);
      const sql = `UPDATE artist
							SET name = ?
							WHERE id = ?`;
      console.log(sql);
      db.query(sql, arrFormValues, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: "OK", id: req.body.id });
        }
      });
    });
  };

  delete = async (req, res) => {
    return new Promise((resolve, reject) => {
      const arrFormValues = Object.values(req.body);
      console.log(arrFormValues);
      const sql = `DELETE FROM artist WHERE name = ?`;

      db.query(sql, arrFormValues, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: "OK"});
        }
      });
    });
  };
}

export default ArtistModel;
