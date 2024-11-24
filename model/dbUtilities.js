const {pool} = require("../model/pool")

async function startTransaction() {
    try {
        const connection = await pool.promise().getConnection();
        await connection.beginTransaction(); // Start the transaction
        return connection; // Return the connection to use in your transaction
    } catch(err){
        console.error('Error starting transaction:', err);
        throw err;
    }
    
  }
  
  async function commitTransaction(connection) {
    try {
      await connection.commit(); // Commit the transaction
      connection.release();
    } catch (err) {
      await rollbackTransaction(connection); // Rollback if commit fails
      throw err;
    }
  }
  
  async function rollbackTransaction(connection) {
    if (!connection) {
        console.error('No connection object provided for rollback');
        return;
      }

    try {
      await connection.rollback(); // Rollback the transaction
    } catch (err) {
      console.error("Error rolling back transaction:", err);
    } finally {
      connection.release(); // Always release the connection
    }
  }
  
  module.exports = { startTransaction, commitTransaction, rollbackTransaction };
  