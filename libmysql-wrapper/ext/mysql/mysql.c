#include <mysql/mysql.h>
#include <stdio.h>

MYSQL *conn = NULL;
int counter = 0;

void init(void)
{
    conn = mysql_init(NULL);
}

int connect(const char *host, const char *user, const char *passwd, const char *db_name, int port)
{
    if (!mysql_real_connect(conn, host, user, passwd, db_name, port, NULL, 0))
    {
        fprintf(stderr, "Failed to connect to database: Error: %s\n", mysql_error(conn));
        fflush(stderr);
        return 0;
    }
    return 1;
}

int real_query(const uint8_t *stmt_str, unsigned long len)
{
    if (conn == NULL)
        return -1;

    return mysql_real_query(conn, stmt_str, len);
}

const uint8_t *result()
{
    MYSQL_RES *result = mysql_use_result(conn);
}

void close()
{
    mysql_close(conn);
}