export interface RequestPage {
  page: number | string;
  perPage: number | string;
}
export function buildRequestPage(req: Request, defaultPer = "30"): RequestPage {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("per_page") || defaultPer;
  return {
    page,
    perPage,
  };
}
