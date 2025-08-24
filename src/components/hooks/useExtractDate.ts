import { getExtractResultFromLLM } from "@/service-worker/extract";
import { ExtractResult } from "@/types/extract.type";
import { useRef, useState } from "react";

const TOO_LATE_DELAY_TIME = 5000;
const useExtractDateFromPrompt = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [extraLoadingMessage, setExtraLoadingMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractResult | null>(null);
  const timerRef = useRef<number>(0);

  const cleanupTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setExtraLoadingMessage(null);
    }
  };
  const extract = async (prompt: string) => {
    setIsLoading(true);
    setExtraLoadingMessage(null);
    setErrorMessage(null);

    cleanupTimer();
    timerRef.current = setTimeout(() => {
      setExtraLoadingMessage(
        "We’re still working on your request. Please hold on just a little longer…!"
      );
    }, TOO_LATE_DELAY_TIME);

    const extractRequest = await getExtractResultFromLLM(prompt);
    cleanupTimer();
    const { data, isError, message: errorMessage } = extractRequest;
    if (!isError) {
      setResult(data);
    } else {
      setResult(null);
      setErrorMessage(
        errorMessage ?? "Occured error in API Server, Please try again later."
      );
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    extraLoadingMessage,
    errorMessage,
    result,
    extract,
  };
};
export default useExtractDateFromPrompt;
