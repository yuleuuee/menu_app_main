import { createPool, postgresConnectionString } from '@vercel/postgres';

const connectionString = process.env.CLIENT_POSTGRES_URL;
const pool = createPool({ connectionString });

export async function ConnectToClientDatabase() {
  const client = await pool.connect();
  try {
    // Check if the connection is successful by running a simple query
    const res = await client.query('SELECT 1');
    console.log('menu_app db connection successful:', res.rows);
    return client; // Connection is established, return the client
  } catch (error) {
    console.error('menu_app db connection error:', error);
    throw error; // Connection failed, throw error
  } finally {
    client.release(); // Release the client back to the pool
  }
}