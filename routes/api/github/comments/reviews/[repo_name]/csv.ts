import { getReviewComments } from "../../../../../../logics/github.ts";
import { HandlerContext } from "../../../../../../server_deps.ts";

export async function handler(req: Request, ctx: HandlerContext) {
  const res = await getReviewComments(req, ctx);
  const resJson = await res.json();
  return new Response(buildCSV(resJson), {
    headers: {
      "Content-Type": "text/csv; charset=cp932",
      "Content-Disposition": "attachment;filename=review_comments.csv",
    },
  });
}

function buildCSV(json: any): string {
  let csv = "comment, author, createdAt";

  let csvBody = "";
  if (json) {
    csvBody = json.reduce(
      (acc: string, cur: any) =>
        `${acc}\n"${cur.body.replaceAll('"', '""')}",${
          cur["user"]["login"]
        },${cur.created_at}`,
      "",
    );
  }

  return `${csv}${csvBody}`;
}
