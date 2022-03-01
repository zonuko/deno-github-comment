const C_TERMINAL_SYMBOL = "\0";
const MYSQL_HOST = "localhost";
const MYSQL_USER = "root";
const MYSQL_PASSWD = "";
const MYSQL_DB_NAME = "mysql";
const MYSQL_PORT = 3306;

function strToBytes(word: string): Uint8Array {
  return new TextEncoder().encode(`${word}${C_TERMINAL_SYMBOL}`);
}

function ffiSuffix(): string {
  switch (Deno.build.os) {
    case "windows":
      return "dll";
    case "darwin":
      return "dylib";
    case "linux":
      return "so";
  }
}

const libInterfaces = {
  init: { parameters: [], result: "void" },
  connect: {
    parameters: ["buffer", "buffer", "buffer", "buffer", "i32"],
    result: "i32",
  },
  real_query: { parameters: ["buffer", "u64"], result: "i32" },
  close: { parameters: [], result: "void" },
} as Record<string, Deno.ForeignFunction>;

class MySQL {
  // TODO: not used any
  #dylib: Deno.DynamicLibrary<typeof libInterfaces> | null = null;
  // TODO: ここらへんコンストラクタで受けたほうが良い
  readonly host = strToBytes(MYSQL_HOST);
  readonly user = strToBytes(MYSQL_USER);
  readonly passwd = strToBytes(MYSQL_PASSWD);
  readonly dbName = strToBytes(MYSQL_DB_NAME);

  private isConn = false;

  constructor() {
    const libName = `./ext/mysql/mysql.${ffiSuffix()}`;

    this.#dylib = Deno.dlopen(libName, libInterfaces);

    this.#dylib.symbols.init();
    const res = this.#dylib.symbols.connect(
      this.host,
      this.user,
      this.passwd,
      this.dbName,
      MYSQL_PORT,
    );
    if (res === 0) {
      this.close();
      throw new Error("コネクション確立に失敗しました。");
    }
    this.isConn = true;
  }

  close() {
    if (!this.#dylib) {
      return;
    }

    if (this.isConn) {
      this.#dylib.symbols.close();
      this.#dylib.close();
    }
  }

  // TODO: return value to typing
  query(queryString: string) {
    if (!this.#dylib) {
      return;
    }

    const q = strToBytes(queryString);
    this.#dylib.symbols.real_query(q, queryString.length);
  }
}

const client = new MySQL();
client.close();
