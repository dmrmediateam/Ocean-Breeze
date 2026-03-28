import { forwardLeadSubmission } from "../_lib/lead-submission";

export async function POST(request: Request) {
  return forwardLeadSubmission(request, "schedule_showing");
}
