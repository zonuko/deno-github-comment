import {
  buildPagenation,
  getReviewComments,
} from "../../../../../logics/github.ts";
import { HandlerContext } from "../../../../../server_deps.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const res = await getReviewComments(req, ctx);
  const resJson = await res.json();
  const pagenation = buildPagenation(res);
  return new Response(JSON.stringify({
    link: pagenation,
    reviewComments: resJson,
  }));
}
