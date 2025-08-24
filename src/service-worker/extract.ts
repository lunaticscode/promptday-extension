import { API_BASE_URL } from "@/utils/api";
import { AppError } from "@/utils/error";

type ExtractMessage = {
  type: "extract-request";
  data: any;
};

chrome.runtime.onMessage.addListener(
  (msg: ExtractMessage, _sender, sendResponse) => {
    (async () => {
      if (msg.type === "extract-request") {
        try {
          const request = await fetch(`${API_BASE_URL}/api/llm/prompt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: msg.data }),
          });
          const { ok, status } = request;
          if (ok) {
            const data = await request.json();
            sendResponse({ data, status });
          } else {
            sendResponse({ data: null, status });
          }
        } catch (err) {
          throw new AppError("api", "LLM_PROMPT_API_ERROR");
        }
      }
    })();
    return true;
  }
);

const unknownErrorMessage =
  "Sorry, Please try again later. If the problem continues, feel free to contact below email\nlunatics384@gmail.com";

const mapErrorStatusToMessage: { [status: number]: string } = {
  500: "Sorry, Occured error in API Server. Please try again later.",
  429: "Too many have been request in a short time. Please wait a moment before trying again.",
  400: "The prompt text provided was not valid. Kindly review your input and try again.",
};

const getErrorMessageFromStatus = (status: number) => {
  const errorMessage = mapErrorStatusToMessage[status] ?? null;
  return errorMessage ?? unknownErrorMessage;
};

export const getExtractResultFromLLM = async (prompt: string) => {
  const response = await chrome.runtime.sendMessage({
    type: "extract-request",
    data: prompt,
  });
  const { data, status } = response;
  //   console.log(data, status);
  if (status === 200 && data) {
    return { isError: false, data };
  }
  return { isError: true, message: getErrorMessageFromStatus(Number(status)) };
};
