import {
  buildPagenation,
  getIssueComments,
} from "../../../../../logics/github.ts";
import { HandlerContext } from "../../../../../server_deps.ts";

// TODO: コメントに関してはいずれもGraphQLでとったほうが色んな情報が取れる(紐づくプルリクの情報とか)
// サンプル
/*
{
  viewer {
    issueComments(first: 1, after:"Y3Vyc29yOnYyOpHOPtcV2Q==") {
      totalCount
      pageInfo {
        endCursor
      }
      nodes {
        repository {
          nameWithOwner
        }
        issue {
          number
        }
        pullRequest {
          number
          title
        }
        body
      }
    }
  }
}
*/
export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const res = await getIssueComments(req, ctx);
  const resJson = await res.json();
  const pagenation = buildPagenation(res);
  return new Response(JSON.stringify({
    link: pagenation,
    issueComments: resJson,
  }));
}
