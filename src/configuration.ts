export default (): ConfigType => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  mysql_host: process.env.MYSQL_HOST,
  mysql_port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  mysql_root_password: process.env.MYSQL_ROOT_PASSWORD,
  mysql_username: process.env.MYSQL_USER,
  mysql_password: process.env.MYSQL_PASSWORD,
  mysql_db_name: process.env.MYSQL_DATABASE,
});

export type ConfigType = {
  port: number;
  mysql_host: string;
  mysql_port: number;
  mysql_root_password: string;
  mysql_username: string;
  mysql_password: string;
  mysql_db_name: string;
};
