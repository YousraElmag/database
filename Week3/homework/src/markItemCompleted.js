'use strict';

function markItemAsCompleted(connection, errorHandler, req, res) {
  const username = req.params.username;
  const password = req.params.password;
  const listDescription = req.params.listDescription;
  const toDoDescription = req.params.toDoDescription;
  const retrieveUserIdQuery = 'SELECT user_id FROM users WHERE user_name = ? AND user_password = ?';
  connection.query(retrieveUserIdQuery, [username, password], (err, rows1) => {
    errorHandler(err, res);
    const retrieveListIdQuery = 'SELECT list_id FROM lists WHERE user_id = ? AND description = ?;';
    connection.query(retrieveListIdQuery, [rows1[0].user_id, listDescription], (err, rows2) => {
      errorHandler(err, res);
      const markAsCompletedQuery = 'UPDATE items SET completion = true WHERE description = ?';
      connection.query(markAsCompletedQuery, toDoDescription, err => {
        errorHandler(err, res);
      });
    });
  });
  res.end();
}

module.exports = markItemAsCompleted;
