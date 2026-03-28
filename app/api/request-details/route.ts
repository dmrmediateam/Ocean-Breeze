import { forwardLeadSubmission } from "../_lib/lead-submission";

export async function POST(request: Request) {
  return forwardLeadSubmission(request, "request_details");
}
