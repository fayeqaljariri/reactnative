const connection = require("../database/db");

const getAllCats = (req, res) => {
  const query = `SELECT * FROM Cats WHERE is_deleted=0;`;
  // use the query method to execute a query
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "All the cats",
      results: result,
    });
  });
};

const createNewCats = (req, res) => {
    const { name, description,breed } = req.body;
    const query = `INSERT INTO Cats (name, description,breed) VALUES (?,?,?);`;
    const data = [name, description,breed];
  
    connection.query(query, data, (err, results) => {
      if (err) {
        res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
      // result are the data returned by mysql server
      res.status(200).json({
        success: true,
        massage: "cat added",
        results: results,
      });
    });
  };
  
  const updateCatsById = (req, res) => {
    const { name, description} = req.body;
    const id = req.params.id;
  
    const query = `UPDATE Cats SET name=?, description=? WHERE id=?;`;
  
    const data = [name, description, id];
  
    connection.query(query, data, (err, results) => {
      if (err) {
        return res.status(404).json({
          success: false,
          massage: `Server error`,
          err: err,
        });
      }
      if (!results.affectedRows) {
        res.status(404).json({
          success: false,
          massage: `The Cats: ${id} is not found`,
          err: err,
        });
      }
      // result are the data returned by mysql server
      res.status(201).json({
        success: true,
        massage: `Cats updated`,
        results: results,
      });
    });
  };
  
  const deleteCatsById = (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    const sql = `DELETE FROM cats WHERE id=?;`
    console.log(sql);
  
    const data = [id];
  
    connection.query(sql,data,  (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server Error",
          err: err,
        });
      }
      console.log(results);
      if (!results.affectedRows) {
        return res.status(404).json({
          success: false,
          massage: `The Cats: ${id} is not found`,
          err: err,
        });
      }
      // result are the data returned by mysql server
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete Cats with id: ${id}`,
        results: results,
      });
    });
  };
  
  module.exports = {
    getAllCats,
    createNewCats,
    updateCatsById,
    deleteCatsById,
  };
  